import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTradersTable1634718589839 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'traders',
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
            name: 'country',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'language',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'currency',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'registeredAt',
            type: 'date',
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
    await queryRunner.dropTable('traders');
  }
}
