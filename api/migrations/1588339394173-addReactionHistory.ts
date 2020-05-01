/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/class-name-casing */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class addReactionHistory1588339394173 implements MigrationInterface {
    name = 'addReactionHistory1588339394173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction" ADD "message_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "UQ_9276e74bb0d8be2c75ec3b51e61" UNIQUE ("message_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_9276e74bb0d8be2c75ec3b51e61" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);

        const reactions = await queryRunner.query('SELECT reaction.id from reaction');

        await Promise.all(reactions.map(async (reaction) => {
            const [lastMessage] = await queryRunner.query('SELECT message.id from message WHERE message.reaction_id = ' + reaction.id + ' ORDER BY message.created DESC LIMIT 1');
            await queryRunner.query('UPDATE reaction SET message_id = ' + lastMessage.id + ' WHERE reaction.id = ' + reaction.id);
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_9276e74bb0d8be2c75ec3b51e61"`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "UQ_9276e74bb0d8be2c75ec3b51e61"`, undefined);
        await queryRunner.query(`ALTER TABLE "reaction" DROP COLUMN "message_id"`, undefined);
    }

}
