import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserBookmarks1577016007577 implements MigrationInterface {
    name = 'addUserBookmarks1577016007577';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "bookmark" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "reactionId" integer, CONSTRAINT "PK_b7fbf4a865ba38a590bb9239814" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_e389fc192c59bdce0847ef9ef8b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD CONSTRAINT "FK_1177ccaa3d1f49c9714252937f9" FOREIGN KEY ("reactionId") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_1177ccaa3d1f49c9714252937f9"`, undefined);
        await queryRunner.query(`ALTER TABLE "bookmark" DROP CONSTRAINT "FK_e389fc192c59bdce0847ef9ef8b"`, undefined);
        await queryRunner.query(`DROP TABLE "bookmark"`, undefined);
    }

}
