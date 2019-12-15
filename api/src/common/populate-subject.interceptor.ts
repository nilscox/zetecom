import { Injectable } from '@nestjs/common';

import { TransformInterceptor } from './transform.interceptor';
import { SubjectService } from '../modules/subject/subject.service';
import { Subject } from '../modules/subject/subject.entity';

@Injectable()
export class PopulateSubject extends TransformInterceptor<Subject> {

  constructor(
    private readonly subjectService: SubjectService,
  ) {
    super();
  }

  async transform(subjects: Subject[]) {
    await this.subjectService.addTotalReactionsCount(subjects);
  }
}
