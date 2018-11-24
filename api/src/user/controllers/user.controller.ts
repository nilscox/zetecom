import { Controller, Get, Param, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe()) id,
  ): Promise<User> {
    return await this.userService.findById(id);
  }

}
