import { ArgumentMetadata, Injectable, ParseIntPipe, PipeTransform } from '@nestjs/common';

@Injectable()
export class OptionalParseIntPipe implements PipeTransform<string, Promise<number | undefined>> {

  transform(value: string | undefined, metadata: ArgumentMetadata): Promise<number | undefined> {
    if (typeof value === 'undefined')
      return undefined;

    return new ParseIntPipe().transform(value, metadata);
  }

}
