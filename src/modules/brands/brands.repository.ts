import { NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { BrandEntity } from './brands.entity';
import { ICreateBrand } from './interfaces';

@EntityRepository(BrandEntity)
class BrandsRepository extends Repository<BrandEntity> {
  async createAndReturn(payload: Partial<BrandEntity>): Promise<BrandEntity> {
    const obj = Object.assign(this.create(), payload);
    const entity = await this.save(obj);
    const brand = await this.findOne(entity.id, {
      relations: [
        'queryParams',
        'keyToColumnMappings',
        'brandPullApis',
        'brandUpdateApis',
      ],
    });
    return brand;
  }

  static async findAndCountStatic(options: any) {
    return BrandEntity.findAndCount(options);
  }

  async findByQuery(query): Promise<BrandEntity> {
    const entity = await this.findOne({
      where: query,
    });
    return entity;
  }

  async createEntity(payload: Partial<ICreateBrand>): Promise<BrandEntity> {
    const obj = Object.assign(this.create(), payload);
    const entity = await this.save(obj);
    return entity;
  }

  async updateEntity(
    id: number,
    payload: Partial<ICreateBrand>,
  ): Promise<BrandEntity | Error> {
    const brand = await this.findOne(id);
    if (!brand) {
      return new NotFoundException('Brand to update was not found');
    }
    const obj = Object.assign(brand, payload);
    const entity = await this.save(obj);
    return entity;
  }
}

export { BrandsRepository };
