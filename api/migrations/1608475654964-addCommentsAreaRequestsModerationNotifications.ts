import {MigrationInterface, QueryRunner} from "typeorm";

export class addCommentsAreaRequestsModerationNotifications1608475654964 implements MigrationInterface {
    name = 'addCommentsAreaRequestsModerationNotifications1608475654964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."comments_area_request_status_enum" RENAME TO "comments_area_request_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "comments_area_request_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" ALTER COLUMN "status" TYPE "comments_area_request_status_enum" USING "status"::"text"::"comments_area_request_status_enum"`);
        await queryRunner.query(`DROP TYPE "comments_area_request_status_enum_old"`);
        await queryRunner.query(`COMMENT ON COLUMN "comments_area_request"."status" IS NULL`);
        await queryRunner.query(`ALTER TYPE "public"."notification_type_enum" RENAME TO "notification_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "notification_type_enum" AS ENUM('rulesUpdate', 'subscriptionReply', 'commentsAreaRequestApproved', 'commentsAreaRequestRejected')`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "type" TYPE "notification_type_enum" USING "type"::"text"::"notification_type_enum"`);
        await queryRunner.query(`DROP TYPE "notification_type_enum_old"`);
        await queryRunner.query(`COMMENT ON COLUMN "notification"."type" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "notification"."type" IS NULL`);
        await queryRunner.query(`CREATE TYPE "notification_type_enum_old" AS ENUM('rulesUpdate', 'subscriptionReply')`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "type" TYPE "notification_type_enum_old" USING "type"::"text"::"notification_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "notification_type_enum"`);
        await queryRunner.query(`ALTER TYPE "notification_type_enum_old" RENAME TO  "notification_type_enum"`);
        await queryRunner.query(`COMMENT ON COLUMN "comments_area_request"."status" IS NULL`);
        await queryRunner.query(`CREATE TYPE "comments_area_request_status_enum_old" AS ENUM('PENDING', 'APPROVED', 'REFUSED')`);
        await queryRunner.query(`ALTER TABLE "comments_area_request" ALTER COLUMN "status" TYPE "comments_area_request_status_enum_old" USING "status"::"text"::"comments_area_request_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "comments_area_request_status_enum"`);
        await queryRunner.query(`ALTER TYPE "comments_area_request_status_enum_old" RENAME TO  "comments_area_request_status_enum"`);
    }

}
