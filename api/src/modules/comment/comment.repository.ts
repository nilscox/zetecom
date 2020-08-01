import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';

import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {

  private joinRelations(queryBuilder: SelectQueryBuilder<Comment>) {
    queryBuilder.leftJoinAndSelect('user', 'author', 'comment.author_id = author.id');
    queryBuilder.leftJoinAndSelect('message', 'message', 'message.comment_id = comment.id');
  }

  private addPagination(queryBuilder: SelectQueryBuilder<Comment>, offset: number, limit: number) {
    queryBuilder.offset(offset);
    queryBuilder.limit(limit);
  }

  findAll(informationId: number | undefined, authorId: number | undefined, search: string | undefined, offset: number, limit: number) {
    const qb = this.createQueryBuilder('comment');

    this.joinRelations(qb);
    this.addPagination(qb, offset, limit);

    if (undefined !== informationId)
      qb.andWhere('information_id = :informationId', { informationId });

    if (undefined !== authorId)
      qb.andWhere('author_id = :authorId', { authorId });

    if (undefined !== search)
      qb.andWhere('message.text ILIKE :search', { search });

    return qb.getMany();
  }

}
