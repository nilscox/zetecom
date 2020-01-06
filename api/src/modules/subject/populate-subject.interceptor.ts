import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';

import { TransformInterceptor } from '../../common/transform.interceptor';
import { Subject } from './subject.entity';
import { SubjectRepository } from './subject.repository';

@Injectable()
export class PopulateSubject extends TransformInterceptor<Subject> {

  get subjectRepository() {
    return getCustomRepository(SubjectRepository);
  }

  async transform(subjects: Subject[]) {
    await this.addTotalReactionsCount(subjects);
  }

  async addTotalReactionsCount(subjects: Subject[]): Promise<Subject[]> {
    if (!subjects.length)
      return [];

    const reactionsCounts = await this.subjectRepository.getTotalReactionsCount(subjects.map(s => s.id));

    subjects.forEach(subject => {
      const reactionsCount = reactionsCounts.find(rc => rc.subjectId === subject.id);

      if (!reactionsCount)
        subject.reactionsCount = 0;
      else
        subject.reactionsCount = reactionsCount.reactionsCount;
    });

    return subjects;
  }

}
