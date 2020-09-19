import {MigrationInterface, QueryRunner} from "typeorm";

export class addInformationAuthor1600474884205 implements MigrationInterface {
    name = 'addInformationAuthor1600474884205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "information" ADD "author" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "information" DROP COLUMN "author"`);
    }

}
