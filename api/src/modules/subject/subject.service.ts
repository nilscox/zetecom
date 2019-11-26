import { NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository, FindConditions, FindManyOptions, Like } from 'typeorm';

import { SortType } from 'Common/sort-type';

import { Information } from '../information/information.entity';
import { User } from '../user/user.entity';
import { Message } from '../reaction/message.entity';

import { Subject } from './subject.entity';
import { CreateSubjectInDto } from './dtos/create-subject-in.dto';

@Injectable()
export class SubjectService {

  constructor(

    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

  ) {}

  async findAll(information, sort: SortType, page: number = 1, search?: string): Promise<Subject[]> {
    const qb = this.subjectRepository.createQueryBuilder('subject')
      .leftJoinAndSelect('subject.author', 'author')
      .leftJoinAndSelect('subject.messages', 'messages')
      .where('subject.information_id = ' + information.id);

    if (search && search.length > 0) {
      qb.where('subject.subject ILIKE :search', { search: `%${search}%` });
      qb.orWhere('subject.quote ILIKE :search', { search: `%${search}%` });
      qb.orWhere('messages.text ILIKE :search', { search: `%${search}%` });
    }

    return qb.getMany();
  }

  async findById(id: number): Promise<Subject> {
    return this.subjectRepository.findOne(id);
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

    return subject;
  }

  async addTotalReactionsCount(subjects: Subject[]): Promise<Subject[]> {
    if (!subjects.length)
      return [];

    const reactionsCounts = await this.subjectRepository.createQueryBuilder('subject')
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
