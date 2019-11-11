import {MigrationInterface, QueryRunner} from 'typeorm';

export class reactionNullableSubject1573482112164 implements MigrationInterface {
    name = 'reactionNullableSubject1573482112164';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_03309067dbc095c9c480210257b"`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "subject_id" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_03309067dbc095c9c480210257b" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_03309067dbc095c9c480210257b"`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "subject_id" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_03309067dbc095c9c480210257b" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
