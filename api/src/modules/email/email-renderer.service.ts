import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';
import mjml2html from 'mjml';

import { ConfigService } from 'src/modules/config/config.service';

export type TestEmailPayload = {
  value: string;
};

type WelcomeEmailPayload = {
  emailValidationLink: string;
};

export type EmailLoginPayload = {
  emailLoginLink: string;
};

type EmailPayload = TestEmailPayload | WelcomeEmailPayload | EmailLoginPayload;

const emailTemplates = ['test', 'welcome', 'email-login'] as const;
type EmailTemplate = typeof emailTemplates[number];

type Template<P extends EmailPayload> = {
  text: HandlebarsTemplateDelegate<P>;
  html: HandlebarsTemplateDelegate<P>;
};

@Injectable()
class EmailRendererService {

  private templates?: { [key in EmailTemplate]: Template<EmailPayload> };

  constructor(
    private readonly configService: ConfigService,
  ) {}

  private renderMjml(mjml: string) {
    const NODE_ENV = this.configService.get('NODE_ENV');

    const { html, errors } = mjml2html(mjml, {
      fonts: {
        'Nunito Sans': 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700',
        'Noticia Text': 'https://fonts.googleapis.com/css2?family=Noticia+Text:wght@700',
      },
      beautify: NODE_ENV !== 'production',
      minify: NODE_ENV === 'production',
      validationLevel: 'strict',
      filePath: path.join(__dirname, 'templates'),
    });

    if (errors.length) {
      console.error(errors);
      throw new Error('Cannot render template');
    }

    return html;
  }

  private async loadTemplate(template: EmailTemplate) {
    const html = await fs.promises.readFile(path.join(__dirname, 'templates', template + '.mjml'));
    const text = await fs.promises.readFile(path.join(__dirname, 'templates', template + '.txt'));

    return {
      html: Handlebars.compile(this.renderMjml(html.toString())),
      text: Handlebars.compile(text.toString()),
    };
  }

  async onInit() {
    const templates = {};

    await Promise.all(emailTemplates.map(async template => {
      templates[template] = await this.loadTemplate(template);
    }));

    this.templates = templates as { [key in EmailTemplate]: Template<EmailPayload> };
  }

  renderTestEmail(payload: TestEmailPayload) {
    return this.renderEmail('test', payload);
  }

  renderWelcomeEmail(payload: WelcomeEmailPayload) {
    return this.renderEmail('welcome', payload);
  }

  renderEmailLoginEmail(payload: EmailLoginPayload) {
    return this.renderEmail('email-login', payload);
  }

  private renderEmail(template: EmailTemplate, payload: EmailPayload) {
    const env = {
      websiteUrl: this.configService.get('WEBSITE_URL'),
    };

    const { html, text } = this.templates[template];

    return {
      html: html({ ...env, ...payload }),
      text: text({ ...env, ...payload }),
    };
  }

}

export default EmailRendererService;
