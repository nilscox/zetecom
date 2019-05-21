import {MigrationInterface, QueryRunner} from "typeorm";

export class initialSchema1558463297703 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "nick" character varying NOT NULL, "avatar" character varying, "emailValidationToken" character varying NOT NULL, "emailValidated" boolean NOT NULL DEFAULT false, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_66dcc4532b5334c01ec92f8ceee" UNIQUE ("nick"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reaction_message" ("id" SERIAL NOT NULL, "text" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "reaction_id" integer, CONSTRAINT "PK_9276e74bb0d8be2c75ec3b51e61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "quick_reaction_type_enum" AS ENUM('APPROVE', 'REFUTE', 'SKEPTIC')`);
        await queryRunner.query(`CREATE TABLE "quick_reaction" ("id" SERIAL NOT NULL, "type" "quick_reaction_type_enum", "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "reaction_id" integer NOT NULL, CONSTRAINT "UQ_002a62cea260af707baa6b686e8" UNIQUE ("user_id", "reaction_id"), CONSTRAINT "PK_d0a3645c807fa56219f1bd8a654" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reaction" ("id" SERIAL NOT NULL, "quote" character varying, "slug" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "author_id" integer NOT NULL, "information_id" integer NOT NULL, "parent_id" integer, CONSTRAINT "UQ_61f111b8bb87324d47cb0c43d7a" UNIQUE ("slug"), CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "information" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "youtube_id" character varying, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer NOT NULL, CONSTRAINT "PK_091c910b61c3170a50eaf22e0c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "report_type_enum" AS ENUM('MISINFORMATION', 'RULES_VIOLATION', 'OTHER')`);
        await queryRunner.query(`CREATE TABLE "report" ("id" SERIAL NOT NULL, "type" "report_type_enum" NOT NULL, "message" text, "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "reaction_id" integer NOT NULL, CONSTRAINT "UQ_891191ee0153c9ed963232b5179" UNIQUE ("user_id", "reaction_id"), CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reaction_message" ADD CONSTRAINT "FK_1c425938807094d10eafcf9c4ff" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quick_reaction" ADD CONSTRAINT "FK_29b3ff36f26cddf248154d2e3ca" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quick_reaction" ADD CONSTRAINT "FK_ea72ed8c5b021e292d5820314fb" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_771eec19d360b0dd9ae9236f743" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_0778deb32d7a27856276b45b766" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_7d0faeb0214cbf4c2a201793e11" FOREIGN KEY ("parent_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "information" ADD CONSTRAINT "FK_a60989a06dc6043c3aa4cb3443a" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_6caf1d29e64dccdf522c60bf509" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_6caf1d29e64dccdf522c60bf509"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8"`);
        await queryRunner.query(`ALTER TABLE "information" DROP CONSTRAINT "FK_a60989a06dc6043c3aa4cb3443a"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_7d0faeb0214cbf4c2a201793e11"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_0778deb32d7a27856276b45b766"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_771eec19d360b0dd9ae9236f743"`);
        await queryRunner.query(`ALTER TABLE "quick_reaction" DROP CONSTRAINT "FK_ea72ed8c5b021e292d5820314fb"`);
        await queryRunner.query(`ALTER TABLE "quick_reaction" DROP CONSTRAINT "FK_29b3ff36f26cddf248154d2e3ca"`);
        await queryRunner.query(`ALTER TABLE "reaction_message" DROP CONSTRAINT "FK_1c425938807094d10eafcf9c4ff"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TYPE "report_type_enum"`);
        await queryRunner.query(`DROP TABLE "information"`);
        await queryRunner.query(`DROP TABLE "reaction"`);
        await queryRunner.query(`DROP TABLE "quick_reaction"`);
        await queryRunner.query(`DROP TYPE "quick_reaction_type_enum"`);
        await queryRunner.query(`DROP TABLE "reaction_message"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
