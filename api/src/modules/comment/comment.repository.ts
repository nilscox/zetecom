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

  findAll(informationId: number | null, authorId: number | null, search: string | null, offset: number, limit: number) {
    const qb = this.createQueryBuilder('comment');

    this.joinRelations(qb);
    this.addPagination(qb, offset, limit);

    if (null !== informationId)
      qb.andWhere('information_id = :informationId', { informationId });

    if (null !== authorId)
      qb.andWhere('author_id = :authorId', { authorId });

    if (null !== search)
      qb.andWhere('message.text ILIKE :search', { search });

    return qb.getMany();
  }

}
