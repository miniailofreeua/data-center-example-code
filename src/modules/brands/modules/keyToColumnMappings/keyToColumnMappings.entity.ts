import { ParentEntity } from 'src/infrastructure/types/abstract/parent.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BrandPullApiEntity } from '../brandPullApis/brandPullApis.entity';
import { BrandUpdateApiEntity } from '../brandUpdateApis/brandUpdateApis.entity';

@Entity('keyToColumnMappings')
export class KeyToColumnMappingEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  key: string;

  @Column({ nullable: false })
  columnName: string;

  @ManyToOne(
    () => BrandUpdateApiEntity,
    (brandUpdateApi) => brandUpdateApi.queryParams,
    {
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn({ name: 'brandUpdateApiId' })
  brandUpdateApi: BrandUpdateApiEntity;
  @Column({ nullable: false })
  brandUpdateApiId: number;

  @ManyToOne(
    () => BrandPullApiEntity,
    (brandPullApi) => brandPullApi.queryParams,
    {
      orphanedRowAction: 'delete',
    },
  )
  @JoinColumn({ name: 'brandPullApiId' })
  brandPullApi: BrandPullApiEntity;
  @Column({ nullable: false })
  brandPullApiId: number;
}
