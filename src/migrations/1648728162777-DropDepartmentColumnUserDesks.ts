import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropDepartmentColumnUserDesks1648728162777
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('userDesks', 'department');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
