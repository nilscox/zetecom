import { getRepository } from 'typeorm';

import { Factory } from '../../../testing/factory';
import { User } from '../../user/user.entity';

import { Report, ReportModerationAction } from './report.entity';

export class ReportFactory implements Factory<Report> {
  private get repository() {
    return getRepository(Report);
  }

  async create(override: Partial<Omit<Report, 'id'>>): Promise<Report> {
    const data = {
      ...override,
    };

    return this.repository.save(data);
  }

  async markAsModerated(report: Report, moderator: User, action: ReportModerationAction): Promise<void> {
    await this.repository.update({ id: report.id }, { moderatedBy: moderator, moderationAction: action });
  }
}
