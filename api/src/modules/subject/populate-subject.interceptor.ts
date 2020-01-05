import { Injectable } from '@nestjs/common';

import { TransformInterceptor } from '../../common/transform.interceptor';
import { SubjectService } from './subject.service';
import { Subject } from './subject.entity';

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
