import { Repository, EntityRepository, Brackets } from 'typeorm';

import { Subject } from './subject.entity';

const PAGE_SIZE = 5;

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> {

  async listSubjects(informationId: number, page = 1): Promise<Subject[]> {
    return this.find({ where: { informationId }, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE });
  }

  async searchSubjects(informationId: number, search: string, page = 1): Promise<Subject[]> {
    return this.createQueryBuilder('subject')
      .leftJoinAndSelect('subject.author', 'author')
      .leftJoinAndSelect('subject.messages', 'messages')
      .where('subject.information_id = :informationId', { informationId })
      .andWhere(new Brackets(qb => {
        qb.where('subject.subject ILIKE :search', { search: `%${search}%` })
          .orWhere('subject.quote ILIKE :search', { search: `%${search}%` })
          .orWhere('messages.text ILIKE :search', { search: `%${search}%` });
      }))
      .skip((page - 1) * PAGE_SIZE)
      .take(PAGE_SIZE)
      .getMany();
  }

  async addTotalReactionsCount(subjects: Subject[]): Promise<Subject[]> {
    if (!subjects.length)
      return [];

    // TODO: subjects.map
    const reactionsCounts = await this.createQueryBuilder('subject')
      .select('subject.id')
      .addSelect('COUNT(r.id)')
      .innerJoin('subject.reactions', 'r')
      .where('subject.id IN (' + subjects.map(s => s.id) + ')')
      .groupBy('subject.id')
      .getRawMany();

    subjects.forEach(subject => {
      const reactionsCount = reactionsCounts.find(rc => rc.subject_id === subject.id);

      if (!reactionsCount)
        subject.reactionsCount = 0;
      else
        subject.reactionsCount = parseInt(reactionsCount.count, 10);
    });

    return subjects;
  }

}
