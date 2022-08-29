import { ParentEntity } from '../../infrastructure/types/abstract/parent.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { BrandEntity } from '../brands/brands.entity';
import { UserEntity } from '../users/users.entity';

@Entity('userBrands')
export class UserBrandEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
  @Column({ nullable: false })
  userId: number;

  @OneToOne(() => BrandEntity)
  @JoinColumn()
  brand: BrandEntity;
  @Column({ nullable: false })
  brandId: number;
}
