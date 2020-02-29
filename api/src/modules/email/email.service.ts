import { readdirSync, readFileSync } from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as email from 'emailjs';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';

import { AuthorizedEmail } from './authorized-email.entity';

const {
  NODE_ENV,
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_TEMPLATE_DIR,
  EMAIL_BYPASS,
  EXTENSION_URL,
} = process.env;

const templates = {};

// TODO: put all that in module init
if (NODE_ENV !== 'test') {
  const templateFiles = readdirSync(EMAIL_TEMPLATE_DIR);

  for (const templateFile of templateFiles) {
    const template = readFileSync(path.join(EMAIL_TEMPLATE_DIR, templateFile));
    const ext = path.extname(templateFile);
    const basename = path.basename(templateFile, ext);

    if (!templates[basename])
      templates[basename] = {};

    templates[basename][ext.slice(1)] = template.toString();
  }
}

@Injectable()
export class EmailService {

  constructor(
    @InjectRepository(AuthorizedEmail)
    private readonly authorizedEmailRepository: Repository<AuthorizedEmail>,
  ) {}

  private static renderTemplate(templateName, replacement: {[key: string]: string}) {
    const template: { html: string, txt: string } = templates[templateName];

    if (!template)
      throw new Error('Unknown template: ' + template);

    const html = Object.keys(replacement)
      .reduce((templ, repl) => templ.replace(`{${repl}}`, replacement[repl]), template.html);

    const text = Object.keys(replacement)
      .reduce((templ, repl) => templ.replace(`{${repl}}`, replacement[repl]), template.txt);

    return { html, text };
  }

  private sendEmail(to: string, subject: string, text: string, html: string): Promise<any> {
    if (EMAIL_BYPASS === 'true')
      return Promise.resolve();

    return new Promise((resolve, reject) => {
      const conn = email.server.connect({
        host: EMAIL_HOST,
        user: EMAIL_USER,
        password: EMAIL_PASSWORD,
        ssl: true,
      });

      const opts: any = {
        from: 'Réagir à l\'information <reply-if-you-want@nils.cx>',
        to,
        subject,
      };

      if (text)
        opts.text = text;

      if (html)
        opts.attachment = [{ data: html, alternative: true }],

      conn.send(opts, (err, message) => {
        if (err)
          reject(err);
        else
          resolve(message);
      });
    });
  }

  sendTestEmail(to: string, subject: string, value: string): Promise<any> {
    const template = EmailService.renderTemplate('test', { value });

    return this.sendEmail(
      to,
      subject,
      template.text,
      template.html,
    );
  }

  sendEmailValidationEmail(user: User): Promise<any> {
    const template = EmailService.renderTemplate('welcome', {
      email_validation_link: `${EXTENSION_URL}/api/auth/email-validation?token=${user.emailValidationToken}`,
    });

    return this.sendEmail(
      user.email,
      'Bienvenue sur Réagir à l\'information ! Confirmez votre adresse email',
      template.text,
      template.html,
    );
  }

  // tslint:disable-next-line: no-shadowed-variable
  async isAthorized(email: string): Promise<boolean> {
    return (await this.authorizedEmailRepository.count({ email })) === 1;
  }

  findAllAuthorized(): Promise<AuthorizedEmail[]> {
    return this.authorizedEmailRepository.find();
  }

  // tslint:disable-next-line: no-shadowed-variable
  authorize(email: string): Promise<AuthorizedEmail> {
    const authorizedEmail = new AuthorizedEmail();

    authorizedEmail.email = email;

    return this.authorizedEmailRepository.save(authorizedEmail);
  }

}
