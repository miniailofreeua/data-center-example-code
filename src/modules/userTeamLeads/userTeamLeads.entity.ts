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

@Entity('userTeamLeads')
export class UserTeamLeadEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => DeskEntity)
  @JoinColumn()
  user: DeskEntity;
  @Column({ nullable: false })
  userId: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  teamLead: UserEntity;
  @Column({ nullable: false })
  teamLeadId: number;
}
