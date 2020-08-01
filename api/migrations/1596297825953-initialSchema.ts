/* eslint-disable quotes, @typescript-eslint/class-name-casing */

import { MigrationInterface, QueryRunner } from "typeorm";

export class initialSchema1596297825953 implements MigrationInterface {
    name = 'initialSchema1596297825953'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE TYPE "user_roles_enum" AS ENUM('ADMIN', 'USER')`);
      await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "nick" character varying NOT NULL, "avatar" character varying, "emailValidationToken" character varying NOT NULL, "emailValidated" boolean NOT NULL DEFAULT false, "emailLoginToken" character varying, "roles" "user_roles_enum" array NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_66dcc4532b5334c01ec92f8ceee" UNIQUE ("nick"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "information" ("id" SERIAL NOT NULL, "identifier" character varying NOT NULL, "title" character varying NOT NULL, "url" character varying NOT NULL, "image_url" character varying, "published" date, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer NOT NULL, CONSTRAINT "UQ_ced12a4957cd63b5ce0f0bc0138" UNIQUE ("identifier"), CONSTRAINT "PK_091c910b61c3170a50eaf22e0c4" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "text" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "comment_id" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TYPE "reaction_type_enum" AS ENUM('APPROVE', 'REFUTE', 'SKEPTIC')`);
      await queryRunner.query(`CREATE TABLE "reaction" ("id" SERIAL NOT NULL, "type" "reaction_type_enum", "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "score" integer NOT NULL DEFAULT 0, "information_id" integer NOT NULL, "author_id" integer NOT NULL, "parent_id" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TABLE "authorized_email" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b5be93df590a94dc9f61252165a" UNIQUE ("email"), CONSTRAINT "PK_2938f9b1fe95c1531b56f22a621" PRIMARY KEY ("id"))`);
      await queryRunner.query(`CREATE TYPE "notification_type_enum" AS ENUM('rulesUpdate', 'subscriptionReply')`);
      await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "type" "notification_type_enum" NOT NULL, "payload" json NOT NULL, "seen" TIMESTAMP, "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
      await queryRunner.query(`ALTER TABLE "information" ADD CONSTRAINT "FK_a60989a06dc6043c3aa4cb3443a" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_27e5936f937ea2c80b1b27a0498" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_bc5fa82a96b8962fca8cde925ae" FOREIGN KEY ("information_id") REFERENCES "information"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_3ce66469b26697baa097f8da923" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_8bd8d0985c0d077c8129fb4a209" FOREIGN KEY ("parent_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8"`);
      await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_8bd8d0985c0d077c8129fb4a209"`);
      await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_3ce66469b26697baa097f8da923"`);
      await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_bc5fa82a96b8962fca8cde925ae"`);
      await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_27e5936f937ea2c80b1b27a0498"`);
      await queryRunner.query(`ALTER TABLE "information" DROP CONSTRAINT "FK_a60989a06dc6043c3aa4cb3443a"`);
      await queryRunner.query(`DROP TABLE "notification"`);
      await queryRunner.query(`DROP TYPE "notification_type_enum"`);
      await queryRunner.query(`DROP TABLE "authorized_email"`);
      await queryRunner.query(`DROP TABLE "comment"`);
      await queryRunner.query(`DROP TABLE "reaction"`);
      await queryRunner.query(`DROP TYPE "reaction_type_enum"`);
      await queryRunner.query(`DROP TABLE "message"`);
      await queryRunner.query(`DROP TABLE "information"`);
      await queryRunner.query(`DROP TABLE "user"`);
      await queryRunner.query(`DROP TYPE "user_roles_enum"`);
    }

}
