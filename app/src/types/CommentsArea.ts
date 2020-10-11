import { Type } from 'class-transformer';

import { Comment } from './Comment';
import { UserLight } from './User';

export class CommentsArea {
  id: number;

  informationUrl: string;

  informationTitle: string;

  informationAuthor: string;

  imageUrl: string | null;

  @Type(() => Date)
  published?: Date;

  @Type(() => UserLight)
  creator?: UserLight;

  commentsCount: number;

  @Type(() => Comment)
  comments?: Comment[];
}

export class CommentsAreaRequest {
  id: number;

  identifier: string;
}
