import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ParentEntity } from '../../../infrastructure/types/abstract/parent.entity';

@Entity('importCustomFields')
export class ImportCustomFieldEntity extends ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  key: string;

  @Column({ nullable: false })
  columnName: string;
}
