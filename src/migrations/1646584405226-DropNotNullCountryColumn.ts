import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropNotNullCountryColumn1646584405226
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE "traders" ALTER COLUMN "country" DROP NOT NULL;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE "traders" ALTER COLUMN "country" SET NOT NULL;
      `,
    );
  }
}
