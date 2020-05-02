import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as email from 'emailjs';
import { Repository } from 'typeorm';

import { ConfigService } from '../config/config.service';
import { User } from '../user/user.entity';

import { AuthorizedEmail } from './authorized-email.entity';

type EmailTemplate = {
  html: string;
  txt: string;
};

@Injectable()
export class EmailService {

  private templates: { [key: string]: EmailTemplate };

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(AuthorizedEmail)
    private readonly authorizedEmailRepository: Repository<AuthorizedEmail>,
  ) {}

  setTemplates(templates: { [key: string]: EmailTemplate }) {
    this.templates = templates;
  }

  private renderTemplate(templateName, replacement: {[key: string]: string}) {
    const template = this.templates[templateName];

    if (!template)
      throw new Error('Unknown template: ' + template);

    const html = Object.keys(replacement)
      .reduce((templ, repl) => templ.replace(`{${repl}}`, replacement[repl]), template.html);

    const text = Object.keys(replacement)
      .reduce((templ, repl) => templ.replace(`{${repl}}`, replacement[repl]), template.txt);

    return { html, text };
  }

  private sendEmail(to: string, subject: string, text: string, html: string): Promise<any> {
    const EMAIL_BYPASS = this.configService.get('EMAIL_BYPASS');
    const EMAIL_HOST = this.configService.get('EMAIL_HOST');
    const EMAIL_USER = this.configService.get('EMAIL_USER');
    const EMAIL_PASSWORD = this.configService.get('EMAIL_PASSWORD');

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
        opts.attachment = [{ data: html, alternative: true }];

      conn.send(opts, (err, message) => {
        if (err)
          reject(err);
        else
          resolve(message);
      });
    });
  }

  sendTestEmail(to: string, subject: string, value: string): Promise<any> {
    const template = this.renderTemplate('test', { value });

    return this.sendEmail(
      to,
      subject,
      template.text,
      template.html,
    );
  }

  sendEmailValidationEmail(user: User): Promise<any> {
    const EXTENSION_URL = this.configService.get('EXTENSION_URL');

    const template = this.renderTemplate('welcome', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      email_validation_link: `${EXTENSION_URL}/api/auth/email-validation?token=${user.emailValidationToken}`,
    });

    return this.sendEmail(
      user.email,
      'Bienvenue sur Réagir à l\'information ! Confirmez votre adresse email',
      template.text,
      template.html,
    );
  }

  sendEmailLoginEmail(user: User): Promise<any> {
    const EXTENSION_URL = this.configService.get('EXTENSION_URL');

    const template = this.renderTemplate('email-login', {
      // eslint-disable-next-line @typescript-eslint/camelcase
      email_login_link: `${EXTENSION_URL}/email-login?token=${user.emailLoginToken}`,
    });

    return this.sendEmail(
      user.email,
      'Réagir à l\'information : lien de connexion',
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
