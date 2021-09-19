import { getEnv } from '~/utils/env';

import _20minutes from './images/20minutes.png';
import francesoir from './images/francesoir.png';
import lefigaro from './images/lefigaro.png';
import lemonde from './images/lemonde.png';
import leparisien from './images/leparisien.png';
import lepoint from './images/lepoint.png';
import lesechos from './images/lesechos.png';
import liberation from './images/liberation.png';
import scienceetvie from './images/scienceetvie.png';
import skeptikon from './images/skeptikon.png';
import youtube from './images/youtube.png';

type Media = {
  label: string;
  image?: string;
  host: RegExp;
};

export const medias: Record<string, Media> = {
  '20minutes': {
    label: '20 minutes',
    image: _20minutes,
    host: /20minutes\.fr$/,
  },

  francesoir: {
    label: 'FranceSoir',
    image: francesoir,
    host: /francesoir\.fr$/,
  },

  lefigaro: {
    label: 'Le Figaro',
    image: lefigaro,
    host: /lefigaro\.fr$/,
  },

  lemonde: {
    label: 'Le Monde',
    image: lemonde,
    host: /lemonde\.fr$/,
  },

  leparisien: {
    label: 'Le Parisien',
    image: leparisien,
    host: /leparisien\.fr$/,
  },

  lepoint: {
    label: 'Le Point',
    image: lepoint,
    host: /lepoint\.fr$/,
  },

  lesechos: {
    label: 'Les Echos',
    image: lesechos,
    host: /lesechos\.fr$/,
  },

  liberation: {
    label: 'Liberation',
    image: liberation,
    host: /liberation\.fr$/,
  },

  scienceetvie: {
    label: 'Science & vie',
    image: scienceetvie,
    host: /science-et-vie\.com$/,
  },

  skeptikon: {
    label: 'Skeptikon',
    image: skeptikon,
    host: /skeptikon\.fr$/,
  },

  youtube: {
    label: 'YouTube',
    image: youtube,
    host: /youtube\.(com|fr)$/,
  },
};

if (getEnv('NODE_ENV') === 'development') {
  medias['test'] = {
    label: 'Test',
    host: /localhost$/,
  };
}
