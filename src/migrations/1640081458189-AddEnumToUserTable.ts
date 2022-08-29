/* eslint-disable @typescript-eslint/no-empty-function */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEnumToUserTable1640081458189 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TYPE user_role_enum ADD VALUE 'company';
        ALTER TYPE user_role_enum ADD VALUE 'crmManager';
        ALTER TYPE user_role_enum ADD VALUE 'deskManager';
        ALTER TYPE user_role_enum ADD VALUE 'teamLead';
        ALTER TYPE user_role_enum ADD VALUE 'agent';
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
