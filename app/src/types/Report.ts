import { Comment, parseComment } from './Comment';
import { parseUser, UserLight } from './User';

export type Report = {
  id: number;
  user: UserLight;
  message: string;
  created: Date;
};

export type ReportedComment = Comment & {
  reports: Report[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseReport = (data: any): Report => {
  return {
    ...data,
    user: parseUser(data.user),
    created: new Date(data.created),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseReportedComment = (data: any): ReportedComment => {
  return {
    ...parseComment(data),
    reports: data.reports.map(parseReport),
  };
};
