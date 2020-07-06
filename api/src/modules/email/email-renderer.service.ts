import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import mjml2html from 'mjml';
import Handlebars from 'handlebars';

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

const loadTemplate = (template: string) => ({
  html: fs.readFileSync(path.join(__dirname, 'templates', template + '.mjml')).toString(),
  text: fs.readFileSync(path.join(__dirname, 'templates', template + '.txt')).toString(),
});

type EmailPayload = TestEmailPayload | WelcomeEmailPayload | EmailLoginPayload;

const emailTemplates = ['test', 'welcome', 'email-login'] as const;
type EmailTemplate = typeof emailTemplates[number];

const templates: { [key in EmailTemplate ]: { text: string; html: string } } = emailTemplates.reduce(
  (obj, template) => ({ ...obj, [template]: loadTemplate(template) }),
  {} as any,
);

@Injectable()
class EmailRendererService {

  constructor(private readonly configService: ConfigService) {}

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
    const { html, text } = templates[template];

    return {
      html: this.replacePayload(this.renderTemplate(html), payload),
      text: this.replacePayload(text, payload),
    };
  }

  private renderTemplate(template: string) {
    const { html, errors } = mjml2html(template);

    if (errors.length) {
      console.error(errors);
      throw new Error('Cannot render template');
    }

    return html;
  }

  private replacePayload(text: string, payload: EmailPayload) {
    const env = {
      websiteUrl: this.configService.get('WEBSITE_URL'),
    };

    const template = Handlebars.compile(text);

    return template({ ...env, ...payload });
  }

}

export default EmailRendererService;
