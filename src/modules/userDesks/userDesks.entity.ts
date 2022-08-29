import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ParentEntity } from '../../infrastructure/types/abstract/parent.entity';
import { DeskEntity } from '../desks/desks.entity';
import { UserEntity } from '../users/users.entity';

// Crm manager > than 1 desk. TL, Agent has only 1 desk. Admin, FD, AM has no desk and have access to all desks

@Entity('userDesks')
export class UserDeskEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => DeskEntity)
  @JoinColumn()
  desk: DeskEntity;
  @Column({ nullable: false })
  deskId: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
  @Column({ nullable: false })
  userId: number;
}
