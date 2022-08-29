import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDesksTable1635237739580 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'desks',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdById',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('desks');
  }
}
