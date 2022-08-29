import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsToTraderToBrands1648565055901
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('tradersToBrands', [
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'sourceUrl',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'registrationIp',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'language',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'param_1',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'param_2',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'param_3',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'param_4',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'param_5',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'param_6',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'param_7',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'param_8',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'param_9',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('tradersToBrands', [
      'phone',
      'email',
      'sourceUrl',
      'registrationIp',
      'param_1',
      'param_2',
      'param_3',
      'param_4',
      'param_5',
      'param_6',
      'param_7',
      'param_8',
      'param_9',
    ]);
  }
}
