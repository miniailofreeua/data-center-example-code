import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddRunEverySecondsColumnToBrandsTable1647873428057
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'brands',
      new TableColumn({
        name: 'runEverySeconds',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('brands', 'runEverySeconds');
  }
}
