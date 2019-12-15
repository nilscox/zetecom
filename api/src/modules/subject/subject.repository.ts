import { Repository, EntityRepository, Brackets } from 'typeorm';

import { Subject } from './subject.entity';
import { Paginated } from 'Common/paginated';

type SubjectReactionsCount = {
  subjectId: number;
  reactionsCount: number;
};

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {

  async findAllPaginated(informationId: number, page: number, pageSize: number): Promise<Paginated<Subject>> {
    const [items, total] = await this.findAndCount({ where: { informationId }, skip: (page - 1) * pageSize, take: pageSize });

    return { items, total };
  }

  async search(informationId: number, search: string, page: number, pageSize: number): Promise<Paginated<Subject>> {
    const [items, total] = await this.createQueryBuilder('subject')
      .leftJoinAndSelect('subject.author', 'author')
      .leftJoinAndSelect('subject.messages', 'messages')
      .where('subject.information_id = :informationId', { informationId })
      .andWhere(new Brackets(qb => {
        qb.where('subject.subject ILIKE :search', { search: `%${search}%` })
          .orWhere('subject.quote ILIKE :search', { search: `%${search}%` })
          .orWhere('messages.text ILIKE :search', { search: `%${search}%` });
      }))
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { items, total };
  }

  async getTotalReactionsCount(subjectIds: number[]): Promise<SubjectReactionsCount[]> {
    const reactionsCounts = await this.createQueryBuilder('subject')
      .select('subject.id')
      .addSelect('COUNT(r.id)')
      .innerJoin('subject.reactions', 'r')
      .where('subject.id IN (' + subjectIds + ')')
      .groupBy('subject.id')
      .getRawMany();

    return reactionsCounts.map(({ subject_id, count }) => ({
      subjectId: subject_id,
      reactionsCount: Number(count),
    }));
  }

}
