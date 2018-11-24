import {
  Injectable,
  Controller,
  Get, Post,
  Param, Body,
  UseInterceptors, UseGuards,
  ClassSerializerInterceptor,
  NotFoundException,
  PipeTransform,
  ArgumentMetadata,
} from '@nestjs/common';

import { IsAuthenticated } from 'Common/auth.guard';
import { User as ReqUser } from 'Common/user.decorator';

import { User } from 'User/entities/user.entity';
import { Information } from '../entities/information.entity';
import { Reaction } from '../entities/reaction.entity';

import { InformationService } from '../services/information.service';

@Injectable()
class InfoParamPipe implements PipeTransform<string, Promise<Information>> {

  constructor(
    private readonly informationService: InformationService,
  ) {}

  async transform(slug: string, metadata: ArgumentMetadata): Promise<Information> {
    const information = await this.informationService.findBySlug(slug);

    if (!information)
      throw new NotFoundException();

    return information;
  }

}

@Controller('/information/:infoSlug/reaction')
@UseInterceptors(ClassSerializerInterceptor)
export class ReactionController {

  constructor(
  ) {}

  @Get()
  findAll(
    @Param('infoSlug', InfoParamPipe) information,
  ): Reaction[] {
    return information.reactions;
  }

}
