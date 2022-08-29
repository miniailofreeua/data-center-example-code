import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropNotNullTradersColumns1645531997333
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE "tradersToBrands" ALTER COLUMN "crmTraderId" DROP NOT NULL;
        ALTER TABLE "traderCredentials" ALTER COLUMN "brandId" DROP NOT NULL;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE "tradersToBrands" ALTER COLUMN "crmTraderId" SET NOT NULL;
        ALTER TABLE "traderCredentials" ALTER COLUMN "brandId" SET NOT NULL;
      `,
    );
  }
}
