import { ParentEntity } from '../../infrastructure/types/abstract/parent.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BrandEntity } from '../brands/brands.entity';
import { TraderEntity } from '../traders/traders.entity';
import { DeskEntity } from '../desks/desks.entity';
import { UserEntity } from '../users/users.entity';

@Entity('tradersToBrands')
export class TraderToBrandEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  importId: string;

  @Column({ nullable: true })
  leadId: number;

  @Column({ nullable: true })
  saleStatus: string;

  @Column({ nullable: true })
  campaignName: string;

  @Column({ nullable: true })
  subCampaignName: string;

  @Column({ nullable: true })
  sourceCompany: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @OneToOne(() => TraderEntity)
  @JoinColumn()
  trader: TraderEntity;
  @Column({ nullable: false })
  traderId: number;

  @OneToOne(() => BrandEntity)
  @JoinColumn()
  brand: BrandEntity;
  @Column()
  brandId: number;

  @OneToOne(() => DeskEntity)
  @JoinColumn()
  desk: DeskEntity;
  @Column()
  deskId: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  agent: UserEntity;
  @Column()
  agentId: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  teamLead: UserEntity;
  @Column()
  teamLeadId: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  company: UserEntity;
  @Column()
  companyId: number;

  @Column({ nullable: true })
  crmTraderId: number;

  @Column({ nullable: false, default: 0 })
  ftd: number;

  @Column({ nullable: true })
  ftdDate: Date;

  @Column({ nullable: false, default: '0' })
  balance: string;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @Column({ nullable: true })
  lastDepositDate: Date;

  @Column({ nullable: true })
  affiliateId: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  sourceUrl: string;

  @Column({ nullable: true })
  registrationIp: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  param_1: string;

  @Column({ nullable: true })
  param_2: string;

  @Column({ nullable: true })
  param_3: string;

  @Column({ nullable: true })
  param_4: string;

  @Column({ nullable: true })
  param_5: string;

  @Column({ nullable: true })
  param_6: string;

  @Column({ nullable: true })
  param_7: string;

  @Column({ nullable: true })
  param_8: string;

  @Column({ nullable: true })
  param_9: string;
}
