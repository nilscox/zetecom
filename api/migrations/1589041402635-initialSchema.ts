/* eslint-disable quotes */

import { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export class initialSchema1589041402635 implements MigrationInterface {
    name = 'initialSchema1589041402635'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE TABLE "authorized_email" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b5be93df590a94dc9f61252165a" UNIQUE ("email"), CONSTRAINT "PK_2938f9b1fe95c1531b56f22a621" PRIMARY KEY ("id"))`, undefined);
      await queryRunner.query(`CREATE TYPE "user_roles_enum" AS ENUM('ADMIN', 'USER')`, undefined);
      await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "nick" character varying NOT NULL, "avatar" character varying, "emailValidationToken" character varying NOT NULL, "emailValidated" boolean NOT NULL DEFAULT false, "emailLoginToken" character varying, "roles" "user_roles_enum" array NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_66dcc4532b5334c01ec92f8ceee" UNIQUE ("nick"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
      await queryRunner.query(`CREATE TABLE "information" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "title" character varying NOT NULL, "image_url" character varying, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer NOT NULL, CONSTRAINT "UQ_c3bef4a1042ba8f97de84ee1b24" UNIQUE ("url"), CONSTRAINT "PK_091c910b61c3170a50eaf22e0c4" PRIMARY KEY ("id"))`, undefined);
      await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "text" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "reaction_id" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`, undefined);
      await queryRunner.query(`CREATE TYPE "quick_reaction_type_enum" AS ENUM('APPROVE', 'REFUTE', 'SKEPTIC')`, undefined);
      await queryRunner.query(`CREATE TABLE "quick_reaction" ("id" SERIAL NOT NULL, "type" "quick_reaction_type_enum", "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "reaction_id" integer NOT NULL, CONSTRAINT "UQ_002a62cea260af707baa6b686e8" UNIQUE ("user_id", "reaction_id"), CONSTRAINT "PK_d0a3645c807fa56219f1bd8a654" PRIMARY KEY ("id"))`, undefined);
      await queryRunner.query(`CREATE TABLE "reaction" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "score" integer NOT NULL DEFAULT 0, "author_id" integer NOT NULL, "information_id" integer NOT NULL, "message_id" integer, "parent_id" integer, CONSTRAINT "REL_9276e74bb0d8be2c75ec3b51e6" UNIQUE ("message_id"), CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`, undefined);
      await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "information_id" integer, "reaction_id" integer, CONSTRAINT "UQ_0ba1989bde5404c7c5bfca4681f" UNIQUE ("user_id", "reaction_id"), CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`, undefined);
      await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "seen" TIMESTAMP, "created" TIMESTAMP NOT NULL DEFAULT now(), "subscription_id" integer NOT NULL, "actor_id" integer NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`, undefined);
      await queryRunner.query(`CREATE TABLE "report" ("id" SERIAL NOT NULL, "message" text, "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "reaction_id" integer NOT NULL, CONSTRAINT "UQ_891191ee0153c9ed963232b5179" UNIQUE ("user_id", "reaction_id"), CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`, undefined);
      await queryRunner.query(`ALTER TABLE "information" ADD CONSTRAINT "FK_a60989a06dc6043c3aa4cb3443a" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
      await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_20b89d1447ef973e9f10973f220" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
      await queryRunner.query(`ALTER TABLE "quick_reaction" ADD CONSTRAINT "FK_29b3ff36f26cddf248154d2e3ca" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
      await queryRunner.query(`ALTER TABLE "quick_reaction" ADD CONSTRAINT "FK_ea72ed8c5b021e292d5820314fb" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
      await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_771eec19d360b0dd9ae9236f743" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
      await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_0778deb32d7a27856276b45b766" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
      await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_9276e74bb0d8be2c75ec3b51e61" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
      await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_7d0faeb0214cbf4c2a201793e11" FOREIGN KEY ("parent_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
      await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_940d49a105d50bbd616be540013" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
      await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_6d59c2b6c5164dea5d23b6e5461" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
      await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_82e408d3a1b1e1e5f0d5e7bd5d6" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
      await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_d5c0b2efb91da0d584fddab9542" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
      await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_16addcdc44128a517daeddd4491" FOREIGN KEY ("actor_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
      await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
      await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_6caf1d29e64dccdf522c60bf509" FOREIGN KEY ("reaction_id") REFERENCES "reaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_6caf1d29e64dccdf522c60bf509"`, undefined);
      await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_c6686efa4cd49fa9a429f01bac8"`, undefined);
      await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_16addcdc44128a517daeddd4491"`, undefined);
      await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_d5c0b2efb91da0d584fddab9542"`, undefined);
      await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_82e408d3a1b1e1e5f0d5e7bd5d6"`, undefined);
      await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_6d59c2b6c5164dea5d23b6e5461"`, undefined);
      await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_940d49a105d50bbd616be540013"`, undefined);
      await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_7d0faeb0214cbf4c2a201793e11"`, undefined);
      await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_9276e74bb0d8be2c75ec3b51e61"`, undefined);
      await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_0778deb32d7a27856276b45b766"`, undefined);
      await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_771eec19d360b0dd9ae9236f743"`, undefined);
      await queryRunner.query(`ALTER TABLE "quick_reaction" DROP CONSTRAINT "FK_ea72ed8c5b021e292d5820314fb"`, undefined);
      await queryRunner.query(`ALTER TABLE "quick_reaction" DROP CONSTRAINT "FK_29b3ff36f26cddf248154d2e3ca"`, undefined);
      await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_20b89d1447ef973e9f10973f220"`, undefined);
      await queryRunner.query(`ALTER TABLE "information" DROP CONSTRAINT "FK_a60989a06dc6043c3aa4cb3443a"`, undefined);
      await queryRunner.query(`DROP TABLE "report"`, undefined);
      await queryRunner.query(`DROP TABLE "notification"`, undefined);
      await queryRunner.query(`DROP TABLE "subscription"`, undefined);
      await queryRunner.query(`DROP TABLE "reaction"`, undefined);
      await queryRunner.query(`DROP TABLE "quick_reaction"`, undefined);
      await queryRunner.query(`DROP TYPE "quick_reaction_type_enum"`, undefined);
      await queryRunner.query(`DROP TABLE "message"`, undefined);
      await queryRunner.query(`DROP TABLE "information"`, undefined);
      await queryRunner.query(`DROP TABLE "user"`, undefined);
      await queryRunner.query(`DROP TYPE "user_roles_enum"`, undefined);
      await queryRunner.query(`DROP TABLE "authorized_email"`, undefined);
    }

}
