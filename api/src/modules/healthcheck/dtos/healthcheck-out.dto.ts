import { Expose } from 'class-transformer';

export class HealthCheckOutDto {

  @Expose()
  api: boolean;

  @Expose()
  database: boolean;

}
