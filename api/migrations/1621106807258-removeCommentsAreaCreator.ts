import {MigrationInterface, QueryRunner} from "typeorm";

export class removeCommentsAreaCreator1621106807258 implements MigrationInterface {
    name = 'removeCommentsAreaCreator1621106807258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_area" DROP CONSTRAINT "FK_55c26a032d29df4c5985de0b68c"`);
        await queryRunner.query(`ALTER TABLE "comments_area" DROP COLUMN "creator_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments_area" ADD "creator_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD CONSTRAINT "FK_55c26a032d29df4c5985de0b68c" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
