import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ParentEntity } from '../../infrastructure/types/abstract/parent.entity';
import { BrandEntity } from '../brands/brands.entity';
import { DeskEntity } from '../desks/desks.entity';
import { UserBrandEntity } from '../userBrands/userBrands.entity';
import { UserDeskEntity } from '../userDesks/userDesks.entity';
import { UserTeamLeadEntity } from '../userTeamLeads/userTeamLeads.entity';

@Entity('users')
export class UserEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
  })
  role: UserRole;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, select: false })
  passwordHash: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  createdBy: UserEntity;
  @Column({ nullable: true })
  createdById: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  teamLead: UserEntity;
  @Column({ nullable: true })
  teamLeadId: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  company: UserEntity;
  @Column({ nullable: true })
  companyId: number;

  @OneToOne(() => BrandEntity)
  @JoinColumn()
  brand: BrandEntity;
  @Column({ nullable: true })
  brandId: number;

  @ManyToMany(() => DeskEntity, (employee) => employee.users)
  @JoinTable({
    name: 'userDesks',
    joinColumns: [{ name: 'userId' }],
    inverseJoinColumns: [{ name: 'deskId' }],
  })
  desks: DeskEntity[];

  @OneToMany(() => UserDeskEntity, (userDesk) => userDesk.user)
  userDesks: UserDeskEntity[];

  @OneToOne(() => UserDeskEntity, (userDesk) => userDesk.user, {
    cascade: true,
  })
  userDesk: UserDeskEntity;

  @OneToMany(() => UserTeamLeadEntity, (userTeamLead) => userTeamLead.user)
  userTeamLeads: UserTeamLeadEntity[];

  @OneToMany(() => UserBrandEntity, (userBrand) => userBrand.user)
  userBrands: UserBrandEntity[];
}
