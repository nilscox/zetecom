import { Injectable } from '@nestjs/common';

import { User } from '../user/user.entity';

import { CreateInformationInDto } from './dtos/create-information-in.dto';
import { UpdateInformationInDto } from './dtos/update-information-in.dto';
import { Information } from './information.entity';
import { InformationRepository } from './information.repository';

@Injectable()
export class InformationService {

  constructor(
    private readonly informationRepository: InformationRepository,
  ) {}

  async exists(informationId: number): Promise<boolean> {
    const count = await this.informationRepository.count({ id: informationId });

    return count > 0;
  }

  async findById(id: number): Promise<Information | undefined> {
    return this.informationRepository.findOne(id);
  }

  async findByIdentifier(identifier: string): Promise<Information | undefined> {
    return this.informationRepository.findOne({ identifier });
  }

  async create(dto: CreateInformationInDto, creator: User): Promise<Information> {
    const information = new Information();

    Object.assign(information, {
      ...dto,
      creator,
    });

    return this.informationRepository.save(information);
  }

  async update(information: Information, dto: UpdateInformationInDto): Promise<Information> {
    Object.assign(information, dto);

    return this.informationRepository.save(information);
  }

}
