import {MigrationInterface, QueryRunner} from "typeorm";

export class removeCommentsAreaModerationNotificationTypes1621422046160 implements MigrationInterface {
    name = 'removeCommentsAreaModerationNotificationTypes1621422046160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "notification" WHERE type = 'commentsAreaRequestApproved' OR type = 'commentsAreaRequestRejected'`);
        
        await queryRunner.query(`ALTER TYPE "public"."notification_type_enum" RENAME TO "notification_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "notification_type_enum" AS ENUM('rulesUpdate', 'subscriptionReply')`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "type" TYPE "notification_type_enum" USING "type"::"text"::"notification_type_enum"`);
        await queryRunner.query(`DROP TYPE "notification_type_enum_old"`);
        await queryRunner.query(`COMMENT ON COLUMN "notification"."type" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "notification"."type" IS NULL`);
        await queryRunner.query(`CREATE TYPE "notification_type_enum_old" AS ENUM('rulesUpdate', 'subscriptionReply', 'commentsAreaRequestApproved', 'commentsAreaRequestRejected')`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "type" TYPE "notification_type_enum_old" USING "type"::"text"::"notification_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "notification_type_enum"`);
        await queryRunner.query(`ALTER TYPE "notification_type_enum_old" RENAME TO  "notification_type_enum"`);
    }

}
