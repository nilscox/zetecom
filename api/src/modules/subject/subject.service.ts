import { NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository, FindConditions, FindManyOptions } from 'typeorm';

import { SortType } from 'Common/sort-type';

import { Information } from '../information/information.entity';
import { User } from '../user/user.entity';
import { Reaction } from '../reaction/reaction.entity';
import { Message } from '../reaction/message.entity';
import { ReactionService } from '../reaction/reaction.service';

import { Subject } from './subject.entity';
import { CreateSubjectInDto } from './dtos/create-subject-in.dto';

@Injectable()
export class SubjectService {

  constructor(

    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    private readonly reactionService: ReactionService,

  ) {}

  async findAll(information, sort: SortType, page: number = 1): Promise<Subject[]> {
    return this.subjectRepository.find();
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
        subject.reactionsCount = parseInt(reactionsCount.count);
    });

    console.log(subjects);
    return subjects;
  }

}
