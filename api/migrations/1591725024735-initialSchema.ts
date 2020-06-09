/* eslint-disable */

import {MigrationInterface, QueryRunner} from "typeorm";

export class initialSchema1591725024735 implements MigrationInterface {
    name = 'initialSchema1591725024735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "authorized_email" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b5be93df590a94dc9f61252165a" UNIQUE ("email"), CONSTRAINT "PK_2938f9b1fe95c1531b56f22a621" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_roles_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "nick" character varying NOT NULL, "avatar" character varying, "emailValidationToken" character varying NOT NULL, "emailValidated" boolean NOT NULL DEFAULT false, "emailLoginToken" character varying, "roles" "user_roles_enum" array NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_66dcc4532b5334c01ec92f8ceee" UNIQUE ("nick"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "information" ("id" SERIAL NOT NULL, "identifier" character varying NOT NULL, "title" character varying NOT NULL, "url" character varying NOT NULL, "image_url" character varying, "published" date, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer NOT NULL, CONSTRAINT "UQ_ced12a4957cd63b5ce0f0bc0138" UNIQUE ("identifier"), CONSTRAINT "PK_091c910b61c3170a50eaf22e0c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "notification_type_enum" AS ENUM('rulesUpdate', 'subscriptionReply')`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "type" "notification_type_enum" NOT NULL, "payload" json NOT NULL, "seen" TIMESTAMP, "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "quick_reaction_type_enum" AS ENUM('APPROVE', 'REFUTE', 'SKEPTIC')`);
        await queryRunner.query(`CREATE TABLE "quick_reaction" ("id" SERIAL NOT NULL, "type" "quick_reaction_type_enum", "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "reaction_id" integer NOT NULL, CONSTRAINT "UQ_002a62cea260af707baa6b686e8" UNIQUE ("user_id", "reaction_id"), CONSTRAINT "PK_d0a3645c807fa56219f1bd8a654" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reaction" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "score" integer NOT NULL DEFAULT 0, "author_id" integer NOT NULL, "information_id" integer NOT NULL, "message_id" integer, "parent_id" integer, CONSTRAINT "REL_9276e74bb0d8be2c75ec3b51e6" UNIQUE ("message_id"), CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "text" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "reaction_id" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "report" ("id" SERIAL NOT NULL, "message" text, "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "reaction_id" integer NOT NULL, CONSTRAINT "UQ_891191ee0153c9ed963232b5179" UNIQUE ("user_id", "reaction_id"), CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reaction_subscription" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "reaction_id" integer, CONSTRAINT "UQ_5de9fa3d6b65a3750594491a8ca" UNIQUE ("user_id", "reaction_id"), CONSTRAINT "PK_ed4f731cc1a041f03a67bf2e936" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "information" ADD CONSTRAINT "FK_a60989a06dc6043c3aa4cb3443a" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quick_reaction" ADD CONSTRAINT "FK_29b3ff36f26cddf248154d2e3ca" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quick_reaction" ADD CONSTRAINT "FK_ea72ed8c5b021e292d5820314fb" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_771eec19d360b0dd9ae9236f743" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_0778deb32d7a27856276b45b766" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_9276e74bb0d8be2c75ec3b51e61" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_7d0faeb0214cbf4c2a201793e11" FOREIGN KEY ("parent_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_20b89d1447ef973e9f10973f220" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_6caf1d29e64dccdf522c60bf509" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction_subscription" ADD CONSTRAINT "FK_0526affa6a9e849daccab86dc58" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction_subscription" ADD CONSTRAINT "FK_3236b7e3e06e0bc91953bf2e9df" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction_subscription" DROP CONSTRAINT "FK_3236b7e3e06e0bc91953bf2e9df"`);
        await queryRunner.query(`ALTER TABLE "reaction_subscription" DROP CONSTRAINT "FK_0526affa6a9e849daccab86dc58"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_6caf1d29e64dccdf522c60bf509"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_20b89d1447ef973e9f10973f220"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_7d0faeb0214cbf4c2a201793e11"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_9276e74bb0d8be2c75ec3b51e61"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_0778deb32d7a27856276b45b766"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_771eec19d360b0dd9ae9236f743"`);
        await queryRunner.query(`ALTER TABLE "quick_reaction" DROP CONSTRAINT "FK_ea72ed8c5b021e292d5820314fb"`);
        await queryRunner.query(`ALTER TABLE "quick_reaction" DROP CONSTRAINT "FK_29b3ff36f26cddf248154d2e3ca"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8"`);
        await queryRunner.query(`ALTER TABLE "information" DROP CONSTRAINT "FK_a60989a06dc6043c3aa4cb3443a"`);
        await queryRunner.query(`DROP TABLE "reaction_subscription"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "reaction"`);
        await queryRunner.query(`DROP TABLE "quick_reaction"`);
        await queryRunner.query(`DROP TYPE "quick_reaction_type_enum"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TYPE "notification_type_enum"`);
        await queryRunner.query(`DROP TABLE "information"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_roles_enum"`);
        await queryRunner.query(`DROP TABLE "authorized_email"`);
    }

}
