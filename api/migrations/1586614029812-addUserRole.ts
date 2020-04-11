/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/class-name-casing */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserRole1586614029812 implements MigrationInterface {
    name = 'addUserRole1586614029812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_roles_enum" AS ENUM('ADMIN', 'USER')`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "roles" "user_roles_enum" array NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`, undefined);
        await queryRunner.query(`DROP TYPE "user_roles_enum"`, undefined);
    }

}
