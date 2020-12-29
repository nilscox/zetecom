import 'reflect-metadata';
import '@testing-library/jest-dom/extend-expect';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.locale('fr');

jest.mock('src/utils/env');
