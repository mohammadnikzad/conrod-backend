import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedAt1743511156483 implements MigrationInterface {
    name = 'AddDeletedAt1743511156483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "payment"
            ADD "registryDatesDeletedat" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "category"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "order_item"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD "deletedAt" TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "deletedAt" TIMESTAMP
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_item" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "category" DROP COLUMN "deletedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "payment" DROP COLUMN "registryDatesDeletedat"
        `);
    }

}
