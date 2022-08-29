import { MigrationInterface, QueryRunner } from 'typeorm';

enum StandpointCrmName {
  tntroyal = 'tntroyal.com',
  standpointfinance = 'standpointfinance.com',
  profitfx = 'profitfx.co',
}

export class InsertIntoBrandsTable1643210027380 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO public.brands
            (name, "createdAt", "updatedAt")
            VALUES('${StandpointCrmName.standpointfinance}', now(), now());
        `);
    await queryRunner.query(`INSERT INTO public.brands
            (name, "createdAt", "updatedAt")
            VALUES('${StandpointCrmName.tntroyal}', now(), now());
        `);
    await queryRunner.query(`INSERT INTO public.brands
                (name, "createdAt", "updatedAt")
                VALUES('${StandpointCrmName.profitfx}', now(), now());
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DELETE FROM public.brands
        WHERE name in (
          '${StandpointCrmName.standpointfinance}',
          '${StandpointCrmName.tntroyal},
          '${StandpointCrmName.profitfx}'
        );
    `);
  }
}
