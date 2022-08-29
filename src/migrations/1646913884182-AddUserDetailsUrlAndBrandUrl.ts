import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserDetailsUrlAndBrandUrl1646913884182
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'brands',
      new TableColumn({
        name: 'userDetailsUrl',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'brands',
      new TableColumn({
        name: 'brandUrl',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.query(`
        ALTER TABLE brands
        ALTER COLUMN "name" SET DATA TYPE varchar;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('brands', 'userDetailsUrl');
    await queryRunner.dropColumn('brands', 'brandUrl');
  }
}
