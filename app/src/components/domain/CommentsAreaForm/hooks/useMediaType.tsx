import { medias } from 'src/domain/medias/medias';
import { MediaType } from 'src/types/CommentsArea';

const useMediaType = (urlStr: string): MediaType | undefined => {
  try {
    const url = new URL(urlStr);

    for (const [type, { host }] of Object.entries(medias)) {
      if (host.exec(url.host)) {
        return type as MediaType;
      }
    }
  } catch {
    return;
  }
};

export default useMediaType;
