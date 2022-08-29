import { ParentEntity } from 'src/infrastructure/types/abstract/parent.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { TraderCredentialsEntity } from '../traderCredentials/traderCredentials.entity';
import { TraderToBrandEntity } from '../tradersToBrands/tradersToBrands.entity';

@Entity('traders')
export class TraderEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  registeredAt: Date;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @Column({ nullable: false, default: true })
  isValid: boolean;

  @Column({ nullable: true })
  validationError: string;

  @Column({ nullable: false, default: 0 })
  ftd: number;

  @OneToMany(
    () => TraderCredentialsEntity,
    (traderCredential) => traderCredential.trader,
    {
      cascade: true,
    },
  )
  traderCredentials: TraderCredentialsEntity[];

  @OneToOne(
    () => TraderCredentialsEntity,
    (traderCredential) => traderCredential.trader,
    {
      cascade: true,
    },
  )
  traderCredential: TraderCredentialsEntity;

  @OneToOne(
    () => TraderToBrandEntity,
    (traderToBrand) => traderToBrand.trader,
    {
      cascade: true,
    },
  )
  traderBrand: TraderToBrandEntity;

  @OneToMany(
    () => TraderToBrandEntity,
    (traderToBrand) => traderToBrand.trader,
    {
      cascade: true,
    },
  )
  traderBrands: TraderToBrandEntity[];
}
