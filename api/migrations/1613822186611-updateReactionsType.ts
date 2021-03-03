import { MigrationInterface, QueryRunner } from 'typeorm';

// prettier-ignore
export class updateReactionsType1613822186611 implements MigrationInterface {
    name = 'updateReactionsType1613822186611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE "reaction"`);

        await queryRunner.query(`ALTER TYPE "public"."reaction_type_enum" RENAME TO "reaction_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "reaction_type_enum" AS ENUM('like', 'approve', 'think', 'disagree', 'dontUnderstand')`);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "type" TYPE "reaction_type_enum" USING "type"::"text"::"reaction_type_enum"`);
        await queryRunner.query(`DROP TYPE "reaction_type_enum_old"`);
        await queryRunner.query(`COMMENT ON COLUMN "reaction"."type" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "reaction"."type" IS NULL`);
        await queryRunner.query(`CREATE TYPE "reaction_type_enum_old" AS ENUM('approve', 'refute', 'skeptic')`);
        await queryRunner.query(`ALTER TABLE "reaction" ALTER COLUMN "type" TYPE "reaction_type_enum_old" USING "type"::"text"::"reaction_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "reaction_type_enum"`);
        await queryRunner.query(`ALTER TYPE "reaction_type_enum_old" RENAME TO  "reaction_type_enum"`);
    }

}
