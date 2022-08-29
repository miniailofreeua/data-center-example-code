import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddLeadIdToTraderTable1647255735843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'traders',
      new TableColumn({
        name: 'leadId',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('traders', 'userDetailsUrl');
  }
}
