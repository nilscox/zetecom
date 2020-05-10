import { promises as fs } from 'fs';
import * as path from 'path';

import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

import { AuthorizedEmail } from './authorized-email.entity';
import { UserController } from './email.controller';
import { EmailService, EmailTemplate } from './email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorizedEmail]),
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule implements OnApplicationBootstrap {

  constructor(
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  getTemplateFiles = () => {
    const NODE_ENV = this.configService.get('NODE_ENV');
    const EMAIL_TEMPLATE_DIR = this.configService.get('EMAIL_TEMPLATE_DIR');

    if (NODE_ENV === 'test') {
      return ['welcome.html', 'welcome.txt', 'email-login.html', 'email-login.txt'];
    }

    return fs.readdir(EMAIL_TEMPLATE_DIR);
  };

  getTemplate = (filepath: string) => {
    const NODE_ENV = this.configService.get('NODE_ENV');

    if (NODE_ENV === 'test') {
      return '';
    }

    return fs.readFile(filepath);
  };

  async onApplicationBootstrap() {
    const EMAIL_TEMPLATE_DIR = this.configService.get('EMAIL_TEMPLATE_DIR');

    const templates: { [name: string]: Partial<EmailTemplate> } = {};

    const templateFiles = await this.getTemplateFiles();

    for (const templateFile of templateFiles) {
      const template = await this.getTemplate(path.join(EMAIL_TEMPLATE_DIR, templateFile));
      const ext = path.extname(templateFile);
      const basename = path.basename(templateFile, ext);

      if (!templates[basename])
        templates[basename] = {};

      templates[basename][ext.slice(1) as 'txt' | 'html'] = template.toString();
    }

    this.emailService.setTemplates(templates as { [name: string]: EmailTemplate });
  }

}
