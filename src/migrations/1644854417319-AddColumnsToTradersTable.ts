import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsToTradersTable1644854417319
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tradersToBrands',
      new TableColumn({
        name: 'importId',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'tradersToBrands',
      new TableColumn({
        name: 'saleStatus',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'tradersToBrands',
      new TableColumn({
        name: 'campaignName',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'tradersToBrands',
      new TableColumn({
        name: 'subCampaignName',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tradersToBrands', 'importId');
    await queryRunner.dropColumn('tradersToBrands', 'saleStatus');
    await queryRunner.dropColumn('tradersToBrands', 'campaignName');
    await queryRunner.dropColumn('tradersToBrands', 'subCampaignName');
  }
}
