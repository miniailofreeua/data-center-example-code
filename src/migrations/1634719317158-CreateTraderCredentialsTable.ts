import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTraderCredentialsTable1634719317158
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'traderCredentials',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'traderId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'brandId',
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
      'traderCredentials',
      new TableForeignKey({
        columnNames: ['traderId'],
        referencedTableName: 'traders',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      'traderCredentials',
      new TableForeignKey({
        columnNames: ['brandId'],
        referencedTableName: 'brands',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('traderCredentials');
  }
}
