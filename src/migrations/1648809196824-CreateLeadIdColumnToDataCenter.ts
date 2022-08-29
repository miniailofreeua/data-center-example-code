import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateLeadIdColumnToDataCenter1648809196824
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('traders', 'leadId');
    await queryRunner.addColumn(
      'tradersToBrands',
      new TableColumn({
        name: 'leadId',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tradersToBrands', 'leadId');
    await queryRunner.addColumn(
      'traders',
      new TableColumn({
        name: 'leadId',
        type: 'int',
        isNullable: true,
      }),
    );
  }
}
