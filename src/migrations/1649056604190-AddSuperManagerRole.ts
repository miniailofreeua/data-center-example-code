import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSuperManagerRole1649056604190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE user_role_enum ADD VALUE 'superManager'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
