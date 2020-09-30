import {MigrationInterface, QueryRunner} from "typeorm";

export class initialSchema1601420527077 implements MigrationInterface {
    name = 'initialSchema1601420527077'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "user_roles_enum" AS ENUM('ADMIN', 'MODERATOR', 'USER')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "nick" character varying NOT NULL, "avatar" character varying, "emailValidationToken" character varying NOT NULL, "emailValidated" boolean NOT NULL DEFAULT false, "emailLoginToken" character varying, "roles" "user_roles_enum" array NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_66dcc4532b5334c01ec92f8ceee" UNIQUE ("nick"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments_area" ("id" SERIAL NOT NULL, "identifier" character varying NOT NULL, "information_url" character varying NOT NULL, "information_title" character varying NOT NULL, "information_author" character varying NOT NULL, "published" date, "image_url" character varying, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "creator_id" integer NOT NULL, CONSTRAINT "UQ_61c504d5b89db6ae455ec6f5d5a" UNIQUE ("identifier"), CONSTRAINT "PK_662046fe2f0d1795d672837f885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "text" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "comment_id" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "reaction_type_enum" AS ENUM('approve', 'refute', 'skeptic')`);
        await queryRunner.query(`CREATE TABLE "reaction" ("id" SERIAL NOT NULL, "type" "reaction_type_enum", "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "comment_id" integer NOT NULL, CONSTRAINT "UQ_19601094466e474ac560d4fc9db" UNIQUE ("user_id", "comment_id"), CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "score" integer NOT NULL DEFAULT 0, "author_id" integer NOT NULL, "comments_area_id" integer NOT NULL, "message_id" integer, "parent_id" integer, CONSTRAINT "REL_a982661c7375f3b20e0eb9ed19" UNIQUE ("message_id"), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "report_moderationaction_enum" AS ENUM('IGNORED', 'DELETED')`);
        await queryRunner.query(`CREATE TABLE "report" ("id" SERIAL NOT NULL, "message" text, "moderationAction" "report_moderationaction_enum", "created" TIMESTAMP NOT NULL DEFAULT now(), "reporter_id" integer, "comment_id" integer, "moderator_id" integer, CONSTRAINT "UQ_b6a6103bbd3ebdfd0a2d0eaa2f4" UNIQUE ("reporter_id", "comment_id"), CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "comment_id" integer, CONSTRAINT "UQ_42aee501742b3fad49552712551" UNIQUE ("user_id", "comment_id"), CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "comments_area_request_status_enum" AS ENUM('PENDING', 'APPROVED', 'REFUSED')`);
        await queryRunner.query(`CREATE TABLE "comments_area_request" ("id" SERIAL NOT NULL, "identifier" character varying NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "status" "comments_area_request_status_enum" NOT NULL, "comments_area_id" integer, "requester_id" integer, CONSTRAINT "PK_67428be2d49bed24709cf594521" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "notification_type_enum" AS ENUM('rulesUpdate', 'subscriptionReply')`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "type" "notification_type_enum" NOT NULL, "payload" json NOT NULL, "seen" TIMESTAMP, "created" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "seed" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "run" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e959d094217adb4d796a027d2c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments_area" ADD CONSTRAINT "FK_55c26a032d29df4c5985de0b68c" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_27e5936f937ea2c80b1b27a0498" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_978c984f412d09b43304e41ae9a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_6fd99c10f1554569541de163428" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_3ce66469b26697baa097f8da923" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_e6f3a528893a48ee11a1d8d5d77" FOREIGN KEY ("comments_area_id") REFERENCES "comments_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_a982661c7375f3b20e0eb9ed19e" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_8bd8d0985c0d077c8129fb4a209" FOREIGN KEY ("parent_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_d41df66b60944992386ed47cf2e" FOREIGN KEY ("reporter_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_8bb2bc4a3d9c55e031bc5d015c5" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_10a121780b323901bc3ebc7fa69" FOREIGN KEY ("moderator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_940d49a105d50bbd616be540013" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_3292074e41c7fe52ab5374367db" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" ADD CONSTRAINT "FK_f0c515a7483fd862f984445770a" FOREIGN KEY ("comments_area_id") REFERENCES "comments_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" ADD CONSTRAINT "FK_3dc65221de1b48b10753fcc9ffc" FOREIGN KEY ("requester_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_928b7aa1754e08e1ed7052cb9d8"`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" DROP CONSTRAINT "FK_3dc65221de1b48b10753fcc9ffc"`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" DROP CONSTRAINT "FK_f0c515a7483fd862f984445770a"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_3292074e41c7fe52ab5374367db"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_940d49a105d50bbd616be540013"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_10a121780b323901bc3ebc7fa69"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_8bb2bc4a3d9c55e031bc5d015c5"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_d41df66b60944992386ed47cf2e"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_8bd8d0985c0d077c8129fb4a209"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_a982661c7375f3b20e0eb9ed19e"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_e6f3a528893a48ee11a1d8d5d77"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_3ce66469b26697baa097f8da923"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_6fd99c10f1554569541de163428"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_978c984f412d09b43304e41ae9a"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_27e5936f937ea2c80b1b27a0498"`);
        await queryRunner.query(`ALTER TABLE "comments_area" DROP CONSTRAINT "FK_55c26a032d29df4c5985de0b68c"`);
        await queryRunner.query(`DROP TABLE "seed"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TYPE "notification_type_enum"`);
        await queryRunner.query(`DROP TABLE "comments_area_request"`);
        await queryRunner.query(`DROP TYPE "comments_area_request_status_enum"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
        await queryRunner.query(`DROP TABLE "report"`);
        await queryRunner.query(`DROP TYPE "report_moderationaction_enum"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "reaction"`);
        await queryRunner.query(`DROP TYPE "reaction_type_enum"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "comments_area"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_roles_enum"`);
    }

}
