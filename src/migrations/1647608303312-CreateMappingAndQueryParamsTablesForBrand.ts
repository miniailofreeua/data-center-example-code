import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateMappingAndQueryParamsTablesForBrand1647608303312
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'queryParams',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'brandId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'key',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'value',
            type: 'varchar',
            isNullable: false,
          },

          {
            default: "timezone('Europe/Kiev', now())",
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
          },
          {
            default: "timezone('Europe/Kiev', now())",
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'keyToColumnMappings',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'brandId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'key',
            type: 'varchar',
            isNullable: false,
          },

          {
            name: 'columnName',
            type: 'varchar',
            isNullable: false,
          },

          {
            default: "timezone('Europe/Kiev', now())",
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
          },
          {
            default: "timezone('Europe/Kiev', now())",
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'queryParams',
      new TableForeignKey({
        columnNames: ['brandId'],
        referencedTableName: 'brands',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'keyToColumnMappings',
      new TableForeignKey({
        columnNames: ['brandId'],
        referencedTableName: 'brands',
        referencedColumnNames: ['id'],
      }),
    );

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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('queryParams');
    await queryRunner.dropTable('keyToColumnMappings');

    await queryRunner.dropColumn('brands', 'domain');
    await queryRunner.dropColumn('brands', 'apiUrl');
  }
}
