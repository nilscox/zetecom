import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';

import { SubjectService } from '../modules/subject/subject.service';
import { Subject } from '../modules/subject/subject.entity';

@Injectable()
export class PopulateSubject implements NestInterceptor {

  constructor(
    private readonly subjectService: SubjectService,
  ) {}

  private async populateSubjects(subjects: Subject[]) {
    if (subjects.length === 0)
      return [];

    await this.subjectService.addTotalReactionsCount(subjects);
  }

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return from(next.handle()
      .toPromise()
      .then(async (res: Subject | Subject[]) => {
        await this.populateSubjects(Array.isArray(res) ? res : [res]);

        return res;
      }));
  }

}
