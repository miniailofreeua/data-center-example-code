import { MigrationInterface, QueryRunner, Table } from 'typeorm';

enum StandpointCrmName {
  tntroyal = 'tntroyal.com',
  standpointfinance = 'standpointfinance.com',
  profitfx = 'profitfx.co',
}

export class CreateBrandsTable1634718492899 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'brands',
        columns: [
          {
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'enum',
            enum: Object.values(StandpointCrmName),
            enumName: 'brand_name_enum',
            isNullable: false,
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
    await queryRunner.dropTable('brands');
  }
}
