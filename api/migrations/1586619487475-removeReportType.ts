/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/class-name-casing */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeReportType1586619487475 implements MigrationInterface {
    name = 'removeReportType1586619487475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "type"`, undefined);
        await queryRunner.query(`DROP TYPE "public"."report_type_enum"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."report_type_enum" AS ENUM('RULES_VIOLATION', 'OTHER')`, undefined);
        await queryRunner.query(`ALTER TABLE "report" ADD "type" "report_type_enum" NOT NULL`, undefined);
    }

}
