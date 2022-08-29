import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ParentEntity } from '../../infrastructure/types/abstract/parent.entity';
import { BrandEntity } from '../brands/brands.entity';
import { TraderEntity } from '../traders/traders.entity';

@Entity('traderCredentials')
export class TraderCredentialsEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => TraderEntity, (trader) => trader.traderCredential)
  @JoinColumn()
  trader: TraderEntity;
  @Column({ nullable: false })
  traderId: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @OneToOne(() => BrandEntity)
  @JoinColumn()
  brand: BrandEntity;
  @Column({ nullable: true })
  brandId: number;
}
