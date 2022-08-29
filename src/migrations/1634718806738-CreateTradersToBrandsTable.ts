import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTradersToBrandsTable1634718806738
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tradersToBrands',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'traderId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'balance',
            type: 'varchar',
            isNullable: false,
            default: '0',
          },
          {
            name: 'brandId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'crmTraderId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'lastLoginAt',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'ftd',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'ftdDate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'lastDepositDate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'affiliateId',
            type: 'int',
            isNullable: false,
          },

          {
            default: "timezone('Europe/Kiev', now())",
            name: 'createdAt',
            type: 'timestamp ',
            isNullable: false,
          },
          {
            default: "timezone('Europe/Kiev', now())",
            name: 'updatedAt',
            type: 'timestamp ',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'tradersToBrands',
      new TableForeignKey({
        columnNames: ['traderId'],
        referencedTableName: 'traders',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      'tradersToBrands',
      new TableForeignKey({
        columnNames: ['brandId'],
        referencedTableName: 'brands',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tradersToBrands');
  }
}
