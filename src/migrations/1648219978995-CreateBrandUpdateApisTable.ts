import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateBrandUpdateApisTable1648219978995
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // create brandApis tables for crm APIs customization
    await queryRunner.createTable(
      new Table({
        name: 'brandUpdateApis',
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
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'domain',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'apiUrl',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'runEverySeconds',
            type: 'varchar',
            isNullable: true,
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
        name: 'brandPullApis',
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
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'domain',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'apiUrl',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'runEverySeconds',
            type: 'varchar',
            isNullable: true,
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
      'brandUpdateApis',
      new TableForeignKey({
        columnNames: ['brandId'],
        referencedTableName: 'brands',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'brandPullApis',
      new TableForeignKey({
        columnNames: ['brandId'],
        referencedTableName: 'brands',
        referencedColumnNames: ['id'],
      }),
    );

    // alter relations for queryParams and keyToColumnMappings table
    // link them to brandApi tables
    await queryRunner.dropColumn('queryParams', 'brandId');
    await queryRunner.dropColumn('keyToColumnMappings', 'brandId');

    await queryRunner.addColumn(
      'queryParams',
      new TableColumn({
        name: 'brandUpdateApiId',
        type: 'int',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'queryParams',
      new TableColumn({
        name: 'brandPullApiId',
        type: 'int',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'keyToColumnMappings',
      new TableColumn({
        name: 'brandUpdateApiId',
        type: 'int',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'keyToColumnMappings',
      new TableColumn({
        name: 'brandPullApiId',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'queryParams',
      new TableForeignKey({
        columnNames: ['brandUpdateApiId'],
        referencedTableName: 'brandUpdateApis',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'queryParams',
      new TableForeignKey({
        columnNames: ['brandPullApiId'],
        referencedTableName: 'brandPullApis',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'keyToColumnMappings',
      new TableForeignKey({
        columnNames: ['brandUpdateApiId'],
        referencedTableName: 'brandUpdateApis',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'keyToColumnMappings',
      new TableForeignKey({
        columnNames: ['brandPullApiId'],
        referencedTableName: 'brandPullApis',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('brandUpdateApis');
    await queryRunner.dropTable('brandPullApis');

    await queryRunner.dropColumn('queryParams', 'brandUpdateApiId');
    await queryRunner.dropColumn('queryParams', 'brandPullApiId');

    await queryRunner.dropColumn('keyToColumnMappings', 'brandUpdateApiId');
    await queryRunner.dropColumn('keyToColumnMappings', 'brandPullApiId');
  }
}
