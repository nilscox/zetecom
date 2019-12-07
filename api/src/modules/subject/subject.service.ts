import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository, FindConditions, FindManyOptions, Like } from 'typeorm';

import { Information } from '../information/information.entity';
import { User } from '../user/user.entity';
import { Message } from '../reaction/message.entity';

import { Subject } from './subject.entity';
import { CreateSubjectInDto } from './dtos/create-subject-in.dto';
import { SubjectRepository } from './subject.repository';

@Injectable()
export class SubjectService {

  constructor(
    private readonly subjectRepository: SubjectRepository,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async findAll(information: Information, page = 1): Promise<Subject[]> {
    const subjects = await this.subjectRepository.listSubjects(information.id, page);

    await this.subjectRepository.addTotalReactionsCount(subjects);

    return subjects;
  }

  async search(information: Information, search: string, page = 1): Promise<Subject[]> {
    const subjects = await this.subjectRepository.searchSubjects(information.id, search, page);

    await this.subjectRepository.addTotalReactionsCount(subjects);

    return subjects;
  }

  async findById(id: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne(id, { relations: ['information'] });

    await this.subjectRepository.addTotalReactionsCount([subject]);

    return subject;
  }

  async create(dto: CreateSubjectInDto, user: User, information: Information): Promise<Subject> {
    const subject = new Subject();
    const message = new Message();

    subject.information = information;
    subject.author = user;
    subject.subject = dto.subject;
    subject.quote = dto.quote;

    message.text = dto.text;
    subject.messages = [message];

    await this.messageRepository.save(message);
    await this.subjectRepository.save(subject);

    await this.subjectRepository.addTotalReactionsCount([subject]);

    return subject;
  }

}
