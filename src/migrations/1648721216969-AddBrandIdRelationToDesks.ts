import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddBrandIdRelationToDesks1648721216969
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'desks',
      new TableColumn({
        name: 'brandId',
        type: 'int',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'desks',
      new TableForeignKey({
        columnNames: ['brandId'],
        referencedTableName: 'brands',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('desks', 'brandId');
  }
}
