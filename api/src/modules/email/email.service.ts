import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

import { ConfigService } from 'src/modules/config/config.service';
import { User } from 'src/modules/user/user.entity';

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

  private sendEmail(to: string, subject: string, text: string, html: string): Promise<unknown> {
    const EMAIL_HOST = this.configService.get('EMAIL_HOST');
    const EMAIL_PORT = this.configService.get('EMAIL_PORT');
    const EMAIL_USER = this.configService.get('EMAIL_USER');
    const EMAIL_PASSWORD = this.configService.get('EMAIL_PASSWORD');
    const EMAIL_SECURE = this.configService.get('EMAIL_SECURE');

    const EMAIL_BYPASS = this.configService.get('EMAIL_BYPASS');
    const EMAIL_FROM = this.configService.get('EMAIL_FROM');

    if (EMAIL_BYPASS === 'true') {
      return Promise.resolve();
    }

    const transport = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: EMAIL_SECURE === 'true',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
      ignoreTLS: EMAIL_SECURE === 'false',
    });

    return new Promise((resolve, reject) => {
      return transport.sendMail(
        {
          from: EMAIL_FROM,
          to,
          subject,
          text,
          html,
        },
        (err, info) => {
          if (err) reject(err);
          else resolve(info);
        },
      );
    });
  }

  sendTestEmail(to: string, subject: string, value: string): Promise<unknown> {
    const template = this.emailRendererService.renderTestEmail({ value });

    return this.sendEmail(to, subject, template.text, template.html);
  }

  sendEmailValidationEmail(user: User): Promise<unknown> {
    const APP_URL = this.configService.get('APP_URL');

    const template = this.emailRendererService.renderWelcomeEmail({
      nick: user.nick,
      emailValidationLink: `${APP_URL}?jeton-validation-email=${user.emailValidationToken}`,
    });

    return this.sendEmail(
      user.email,
      'Bienvenue sur Zétécom ! Confirmez votre adresse email',
      template.text,
      template.html,
    );
  }

  sendEmailLoginEmail(user: User): Promise<unknown> {
    const APP_URL = this.configService.get('APP_URL');

    const template = this.emailRendererService.renderEmailLoginEmail({
      emailLoginLink: `${APP_URL}?jeton-connexion=${user.emailLoginToken}`,
    });

    return this.sendEmail(user.email, 'Zétécom : lien de connexion', template.text, template.html);
  }
}
