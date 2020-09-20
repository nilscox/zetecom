import { Injectable } from '@nestjs/common';
import email from 'emailjs';

import { ConfigService } from '../config/config.service';
import { User } from '../user/user.entity';

import EmailRendererService from './email-renderer.service';

export type EmailTemplate = {
  html: string;
  txt: string;
};

@Injectable()
export class EmailService {

  constructor(
    private readonly configService: ConfigService,
    private readonly emailRendererService: EmailRendererService,
  ) {}

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
        from: 'Zétécom <contact@zetecom.fr>',
        to,
        subject,
      };

      if (text)
        opts.text = text;

      if (html)
        opts.attachment = [{ data: html, alternative: true }];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      conn.send(opts, (err: any, message: any) => {
        if (err)
          reject(err);
        else
          resolve(message);
      });
    });
  }

  sendTestEmail(to: string, subject: string, value: string): Promise<any> {
    const template = this.emailRendererService.renderTestEmail({ value });

    return this.sendEmail(
      to,
      subject,
      template.text,
      template.html,
    );
  }

  sendEmailValidationEmail(user: User): Promise<any> {
    const APP_URL = this.configService.get('APP_URL');

    const template = this.emailRendererService.renderWelcomeEmail({
      emailValidationLink: `${APP_URL}/validation-email/${user.emailValidationToken}`,
    });

    return this.sendEmail(
      user.email,
      'Bienvenue sur Zétécom ! Confirmez votre adresse email',
      template.text,
      template.html,
    );
  }

  sendEmailLoginEmail(user: User): Promise<any> {
    const APP_URL = this.configService.get('APP_URL');

    const template = this.emailRendererService.renderEmailLoginEmail({
      emailLoginLink: `${APP_URL}/email-login?token=${user.emailLoginToken}`,
    });

    return this.sendEmail(
      user.email,
      'Zétécom : lien de connexion',
      template.text,
      template.html,
    );
  }

}
