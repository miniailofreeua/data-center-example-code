import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

enum DeskDepartment {
  Conversion = 'conversion',
  Retention = 'retention',
  ConversionAndRetention = 'conversionAndRetention',
}

export class CreateUserDesksTable1636447268692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'userDesks',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'deskId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'department',
            type: 'enum',
            enum: Object.values(DeskDepartment),
            enumName: 'desk_department_enum',
            isNullable: true,
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
      'userDesks',
      new TableForeignKey({
        columnNames: ['deskId'],
        referencedTableName: 'desks',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'userDesks',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('userDesks');
  }
}
