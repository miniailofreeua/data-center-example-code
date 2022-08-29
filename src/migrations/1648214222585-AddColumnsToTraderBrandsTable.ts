import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsToTraderBrandsTable1648214222585
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tradersToBrands',
      new TableColumn({
        name: 'sourceCompany',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'tradersToBrands',
      new TableColumn({
        name: 'country',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tradersToBrands', 'sourceCompany');
    await queryRunner.dropColumn('tradersToBrands', 'country');
  }
}
