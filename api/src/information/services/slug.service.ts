import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugService {

  slugify(text) {
    return text.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      .slice(0, 64)
      + '-' + Math.random().toString(36).slice(4);
  }

}
