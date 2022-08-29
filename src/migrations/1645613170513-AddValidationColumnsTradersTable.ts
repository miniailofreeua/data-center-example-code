import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddValidationColumnsTradersTable1645613170513
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'traders',
      new TableColumn({
        name: 'isValid',
        type: 'boolean',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'traders',
      new TableColumn({
        name: 'validationError',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('traders', 'isValid');
    await queryRunner.dropColumn('traders', 'validationError');
  }
}
