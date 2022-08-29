import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ParentEntity } from '../../infrastructure/types/abstract/parent.entity';
import { DeskEntity } from '../desks/desks.entity';
import { BrandPullApiEntity } from './modules/brandPullApis/brandPullApis.entity';
import { BrandUpdateApiEntity } from './modules/brandUpdateApis/brandUpdateApis.entity';

@Entity('brands')
export class BrandEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  userDetailsUrl: string;

  @Column({ nullable: true })
  brandUrl: string;

  @OneToMany(() => BrandUpdateApiEntity, (queryParams) => queryParams.brand, {
    cascade: true,
  })
  brandUpdateApis: BrandUpdateApiEntity[];

  @OneToMany(() => BrandPullApiEntity, (queryParams) => queryParams.brand, {
    cascade: true,
  })
  brandPullApis: BrandPullApiEntity[];

  @OneToMany(() => DeskEntity, (desks) => desks.brand, {
    cascade: true,
  })
  desks: BrandPullApiEntity[];
}
