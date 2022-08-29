import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

enum UserRole {
  Admin = 'admin',
  SuperManager = 'superManager',
  Company = 'company',
  CrmManager = 'crmManager',
  DeskManager = 'deskManager',
  TeamLead = 'teamLead',
  Agent = 'agent',
}

export class CreateUsersTable1635237739584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'createdById',
            type: 'int',
            isNullable: true,
          },

          {
            name: 'role',
            type: 'enum',
            enum: Object.values(UserRole),
            enumName: 'user_role_enum',
            isNullable: false,
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
            name: 'username',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'passwordHash',
            type: 'varchar',
            isNullable: false,
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
      'users',
      new TableForeignKey({
        columnNames: ['createdById'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.query(`DROP TYPE "user_role_enum"`);
  }
}
