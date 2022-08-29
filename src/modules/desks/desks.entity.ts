import {
  Entity,
  Column,
  OneToOne,
  JoinTable,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../users/users.entity';
import { BrandEntity } from '../brands/brands.entity';
import { ParentEntity } from '../../infrastructure/types/abstract/parent.entity';

@Entity('desks')
export class DeskEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  createdBy: UserEntity | number;

  @ManyToMany(() => UserEntity, (user) => user.desks)
  @JoinTable()
  users: UserEntity;

  @OneToOne(() => BrandEntity)
  @JoinColumn()
  brand: BrandEntity;
  @Column({ nullable: false })
  brandId: number;
}
