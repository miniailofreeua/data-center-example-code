import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

abstract class ParentEntity extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export { ParentEntity };
