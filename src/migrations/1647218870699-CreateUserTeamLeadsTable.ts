import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserTeamLeadsTable1647218870699
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'userTeamLeads',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'teamLeadId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'userId',
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
      'userTeamLeads',
      new TableForeignKey({
        columnNames: ['teamLeadId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'userTeamLeads',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('userTeamLeads');
  }
}
