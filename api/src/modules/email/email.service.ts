import * as path from 'path';
import { readFileSync, readdirSync } from 'fs';
import { Injectable } from '@nestjs/common';
import * as email from 'emailjs';

import { User } from '../user/user.entity';

const {
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_TEMPLATE_DIR,
  BASE_URL,
} = process.env;

const templateFiles = readdirSync(EMAIL_TEMPLATE_DIR);
const templates = {};

for (const templateFile of templateFiles) {
  const template = readFileSync(path.join(EMAIL_TEMPLATE_DIR, templateFile));
  const ext = path.extname(templateFile);
  const basename = path.basename(templateFile, ext);

  if (!templates[basename])
    templates[basename] = {};

  templates[basename][ext.slice(1)] = template.toString();
}

@Injectable()
export class EmailService {

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
    return new Promise((resolve, reject) => {
      const conn = email.server.connect({
        host: EMAIL_HOST,
        user: EMAIL_USER,
        password: EMAIL_PASSWORD,
        ssl: true,
      });

      const opts: any = {
        from: 'Chercheurs de vérité <reply-if-you-want@nils.cx>',
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

  sendTestEmail(email, subject, value: string): Promise<any> {
    const template = EmailService.renderTemplate('test', { value });

    return this.sendEmail(
      email,
      subject,
      template.text,
      template.html,
    );
  }

  sendEmailValidationEmail(user: User): Promise<any> {
    const template = EmailService.renderTemplate('welcome', {
      email_validation_link: `${BASE_URL}/api/auth/email-validation?token=${user.emailValidationToken}`,
    });

    return this.sendEmail(
      user.email,
      '[CDV] Bienvenue sur CDV ! Confirmez votre adresse email',
      template.text,
      template.html,
    );
  }

}
