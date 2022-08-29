import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCompanyIdColumnToUser1647288524686
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'companyId',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['companyId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'companyId');
  }
}
