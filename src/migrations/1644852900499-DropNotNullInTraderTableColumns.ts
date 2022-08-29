import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropNotNullInTraderTableColumns1644852900499
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE "tradersToBrands" ALTER COLUMN "affiliateId" DROP NOT NULL;
        ALTER TABLE "traders" ALTER COLUMN "language" DROP NOT NULL;
        ALTER TABLE "traders" ALTER COLUMN "currency" DROP NOT NULL;
        ALTER TABLE "traders" ALTER COLUMN "registeredAt" DROP NOT NULL;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE "tradersToBrands" ALTER COLUMN "affiliateId" SET NOT NULL;
        ALTER TABLE "traders" ALTER COLUMN "language" SET NOT NULL;
        ALTER TABLE "traders" ALTER COLUMN "currency" SET NOT NULL;
        ALTER TABLE "traders" ALTER COLUMN "registeredAt" SET NOT NULL;
      `,
    );
  }
}
