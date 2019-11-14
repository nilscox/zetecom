import { Expose } from 'class-transformer';

export class HealthCheckOutDto {

  @Expose()
  api: boolean;

  @Expose()
  database: boolean;

  @Expose()
  extension: boolean;

  @Expose()
  website: boolean;

}
