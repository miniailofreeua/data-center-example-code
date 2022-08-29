import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddRelationColumnsForTraderToBrands1648818307485
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('tradersToBrands', [
      new TableColumn({
        name: 'agentId',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'teamLeadId',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'deskId',
        type: 'int',
        isNullable: true,
      }),
      new TableColumn({
        name: 'companyId',
        type: 'int',
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      'tradersToBrands',
      new TableForeignKey({
        columnNames: ['agentId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'tradersToBrands',
      new TableForeignKey({
        columnNames: ['teamLeadId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'tradersToBrands',
      new TableForeignKey({
        columnNames: ['deskId'],
        referencedTableName: 'desks',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'tradersToBrands',
      new TableForeignKey({
        columnNames: ['companyId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('tradersToBrands', [
      'agentId',
      'deskId',
      'companyId',
      'teamLeadId',
    ]);
  }
}
