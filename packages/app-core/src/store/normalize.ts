import { denormalize, normalize, schema } from 'normalizr';

import { Comment } from '../entities/Comment';
import { CommentsArea } from '../entities/CommentsArea';
import { Information } from '../entities/Information';
import { User } from '../entities/User';

import { createAction } from './createAction';
import { AppState } from './store';

type ID = string;

const userSchema = new schema.Entity<User>('users');
type NormalizedUser = User;

const informationSchema = new schema.Entity<Information>('informations');
type NormalizedInformation = Information;

const commentSchema = new schema.Entity<Comment>('comments', {});
interface NormalizedComment extends Omit<Comment, 'author' | 'replies'> {
  author: ID;
  replies: ID[];
}

commentSchema.define({
  author: userSchema,
  replies: [commentSchema],
});

const commentsAreaSchema = new schema.Entity<CommentsArea>('commentsAreas');
interface NormalizedCommentsArea extends Omit<CommentsArea, 'information' | 'comments'> {
  information: ID;
  comments: ID;
}

commentsAreaSchema.define({
  information: informationSchema,
  comments: [commentSchema],
});

export type NormalizedEntities = {
  users: Record<string, NormalizedUser>;
  informations: Record<string, NormalizedInformation>;
  commentsAreas: Record<string, NormalizedCommentsArea>;
  comments: Record<string, NormalizedComment>;
};

type Entities = {
  user: User;
  information: Information;
  commentsArea: CommentsArea;
  comment: Comment;
};

type EntityType = keyof Entities;
type Entity = Entities[EntityType];

const setEntities = (entities: Partial<NormalizedEntities>) => {
  return createAction('setEntities', entities);
};

export const createStoreEntityAction = <E extends Entity>(entitySchema: schema.Entity<E>) => {
  return (...entities: Array<E>) => {
    return setEntities(normalize(entities, [entitySchema]).entities);
  };
};

export const createEntitySelector = <E extends Entity>(entitySchema: schema.Entity<E>) => {
  return (state: AppState, id: ID) => {
    return denormalize(id, entitySchema, state.entities) as E;
  };
};

export const setUser = createStoreEntityAction(userSchema);
export const selectUser = createEntitySelector(userSchema);

export const setCommentsArea = createStoreEntityAction(commentsAreaSchema);
export const selectCommentsArea = createEntitySelector(commentsAreaSchema);

export const setComment = createStoreEntityAction(commentSchema);
export const selectComment = createEntitySelector(commentSchema);

export type NormalizeActions = ReturnType<typeof setUser | typeof setCommentsArea | typeof setComment>;
