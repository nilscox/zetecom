import { classToPlain, Expose, plainToClass, Type } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

import 'reflect-metadata';

class Dto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => Dto)
  child: Dto;
}

const obj: any = { id: 42 };
obj.child = obj;

console.log(plainToClass(Dto, obj));
