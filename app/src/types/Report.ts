import { Comment } from './Comment';
import { UserLight } from './User';

export type Report = {
  id: number;
  reportedBy: UserLight;
  message: string;
  created: string;
};

export type ReportedComment = Comment & {
  reports: Report[];
};
