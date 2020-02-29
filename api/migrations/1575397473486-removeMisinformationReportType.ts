/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/class-name-casing */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeMisinformationReportType1575397473486 implements MigrationInterface {
    name = 'removeMisinformationReportType1575397473486';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."report_type_enum" RENAME TO "report_type_enum_old"`, undefined);
        await queryRunner.query(`CREATE TYPE "report_type_enum" AS ENUM('RULES_VIOLATION', 'OTHER')`, undefined);
        await queryRunner.query(`ALTER TABLE "report" ALTER COLUMN "type" TYPE "report_type_enum" USING "type"::"text"::"report_type_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "report_type_enum_old"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "report_type_enum_old" AS ENUM('MISINFORMATION', 'RULES_VIOLATION', 'OTHER')`, undefined);
        await queryRunner.query(`ALTER TABLE "report" ALTER COLUMN "type" TYPE "report_type_enum_old" USING "type"::"text"::"report_type_enum_old"`, undefined);
        await queryRunner.query(`DROP TYPE "report_type_enum"`, undefined);
        await queryRunner.query(`ALTER TYPE "report_type_enum_old" RENAME TO  "report_type_enum"`, undefined);
    }

}
