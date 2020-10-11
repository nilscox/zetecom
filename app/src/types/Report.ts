import { Type } from 'class-transformer';

import { Comment } from './Comment';
import { UserLight } from './User';

export class Report {
  id: number;

  @Type(() => UserLight)
  reportedBy: UserLight;

  message: string;

  @Type(() => Date)
  created: Date;
}

export class ReportedComment extends Comment {
  @Type(() => Report)
  reports: Report[];
}
