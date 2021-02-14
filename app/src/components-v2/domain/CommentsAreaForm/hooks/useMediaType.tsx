import { MediaType } from 'src/types/CommentsArea';
import { medias } from 'src/utils/medias';

const useMediaType = (urlStr: string): MediaType | undefined => {
  try {
    const url = new URL(urlStr);

    for (const [type, { host }] of Object.entries(medias)) {
      if (url.host.match(host)) {
        return type as MediaType;
      }
    }
  } catch {
    return;
  }
};

export default useMediaType;
