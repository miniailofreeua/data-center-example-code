import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddTeamLeadColumnToUserTable1640171307279
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'teamLeadId',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['teamLeadId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'teamLeadId');
  }
}
