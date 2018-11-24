import { Injectable } from '@nestjs/common';

@Injectable()
export class YoutubeService {

  static YOUTUBE_REGEX = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

  getYoutubeId(url: string): string {
    const match = YoutubeService.YOUTUBE_REGEX.exec(url);

    if (!match)
      return null;

    return match[1];
  }

}
