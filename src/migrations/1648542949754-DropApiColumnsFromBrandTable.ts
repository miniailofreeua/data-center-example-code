import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DropApiColumnsFromBrandTable1648542949754
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('brands', 'domain');
    await queryRunner.dropColumn('brands', 'apiUrl');
    await queryRunner.dropColumn('brands', 'runEverySeconds');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'brands',
      new TableColumn({
        name: 'domain',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'brands',
      new TableColumn({
        name: 'apiUrl',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'brands',
      new TableColumn({
        name: 'runEverySeconds',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
