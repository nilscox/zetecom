import { Comment, commentAndReplies, CommentsArea, User } from '@zetecom/app-core';

export class EntityContainer<T extends { id: string }> {
  private items = new Map<string, T>();

  constructor(private entityName: string, items: T[]) {
    this.addItems(items);
  }

  addItem = (item: T) => {
    this.items.set(item.id, item);
  };

  addItems = (items: T[]) => {
    items.forEach(this.addItem);
  };

  allItems = () => {
    return Array.from(this.items.values());
  };

  getItem = (id: string): T => {
    const item = this.items.get(id);

    if (!item) {
      throw new Error(`EntityContainer: ${this.entityName} with id "${id}" is not set`);
    }

    return item;
  };
}

export type DataSet = {
  commentsAreas: CommentsArea[];
  users: User[];
};

export class EntitiesContainers {
  readonly commentsAreas: EntityContainer<CommentsArea>;

  readonly comments: EntityContainer<Comment>;

  readonly users: EntityContainer<User>;

  constructor(dataset: DataSet) {
    this.commentsAreas = new EntityContainer('CommentsArea', dataset.commentsAreas);

    this.comments = new EntityContainer(
      'Comment',
      dataset.commentsAreas.flatMap(({ comments }) => comments.flatMap(commentAndReplies)),
    );

    this.users = new EntityContainer('User', dataset.users);
  }
}
