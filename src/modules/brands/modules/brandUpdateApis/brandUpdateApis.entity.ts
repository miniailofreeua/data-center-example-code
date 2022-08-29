import { ParentEntity } from 'src/infrastructure/types/abstract/parent.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BrandEntity } from '../../brands.entity';
import { KeyToColumnMappingEntity } from '../keyToColumnMappings/keyToColumnMappings.entity';
import { QueryParamEntity } from '../queryParams/queryParams.entity';

@Entity('brandUpdateApis')
export class BrandUpdateApiEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  domain: string;

  @Column({ nullable: false })
  apiUrl: string;

  @Column({ nullable: false })
  runEverySeconds: string;

  @OneToMany(
    () => KeyToColumnMappingEntity,
    (keyToColumnMappings) => keyToColumnMappings.brandUpdateApi,
    {
      cascade: true,
    },
  )
  keyToColumnMappings: KeyToColumnMappingEntity[];

  @OneToMany(
    () => QueryParamEntity,
    (queryParams) => queryParams.brandUpdateApi,
    {
      cascade: true,
    },
  )
  queryParams: QueryParamEntity[];

  @ManyToOne(() => BrandEntity, (brand) => brand.brandUpdateApis, {
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'brandId' })
  brand: BrandEntity;
  @Column({ nullable: false })
  brandId: number;
}
