import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCreatedAtColumns1648032141881 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('traders', 'createdAt');
    await queryRunner.dropColumn('traders', 'updatedAt');

    await queryRunner.dropColumn('tradersToBrands', 'createdAt');
    await queryRunner.dropColumn('tradersToBrands', 'updatedAt');

    await queryRunner.dropColumn('traderCredentials', 'createdAt');
    await queryRunner.dropColumn('traderCredentials', 'updatedAt');

    await queryRunner.addColumn(
      'traders',
      new TableColumn({
        default: "timezone('Europe/Kiev', now())",
        name: 'createdAt',
        type: 'timestamp ',
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      'traders',
      new TableColumn({
        default: "timezone('Europe/Kiev', now())",
        name: 'updatedAt',
        type: 'timestamp ',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'tradersToBrands',
      new TableColumn({
        default: "timezone('Europe/Kiev', now())",
        name: 'createdAt',
        type: 'timestamp ',
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      'tradersToBrands',
      new TableColumn({
        default: "timezone('Europe/Kiev', now())",
        name: 'updatedAt',
        type: 'timestamp ',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'traderCredentials',
      new TableColumn({
        default: "timezone('Europe/Kiev', now())",
        name: 'createdAt',
        type: 'timestamp ',
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      'traderCredentials',
      new TableColumn({
        default: "timezone('Europe/Kiev', now())",
        name: 'updatedAt',
        type: 'timestamp ',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
