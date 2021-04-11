import { Minutes20 } from './20minutes';
import { FranceSoir } from './francesoir';
import { LeFigaro } from './lefigaro';
import { LeMonde } from './lemonde';
import { LeParisien } from './leparisien';
import { LePoint } from './lepoint';
import { LesEchos } from './lesechos';
import { Liberation } from './liberation';
import { ScienceEtVie } from './scienceetvie';
import { Skeptikon } from './skeptikon';
import { YouTube } from './youtube';
import { Test } from './test';
import { Integration } from '../integration/IntegrationHost';

const integrations: Array<{ new (): Integration }> = [
  Minutes20,
  FranceSoir,
  LeFigaro,
  LeMonde,
  LeParisien,
  LePoint,
  LesEchos,
  Liberation,
  ScienceEtVie,
  Skeptikon,
  YouTube,
];

if (process.env.NODE_ENV === 'development') {
  integrations.push(Test);
}

export default integrations;
