import {
  Controller,
  UseGuards,
  Get,
  Query,
  Body,
  Post,
  ParseIntPipe,
  Param,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { SchemaValidationPipe } from 'src/infrastructure/pipes/schema_validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BrandEntity } from './brands.entity';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { PartialUpdateBrandDto } from './dtos/partial-update-brand-dto';
import { IBrand, IBrandCreate } from './interfaces/brand.interface';

@Controller('brands')
class BrandsController {
  constructor(private readonly _brandsService: BrandsService) {}

  @Post('/get-brand-webhook')
  async getBrandWebhook(@Query() query: any, @Body() data): Promise<any> {
    const result = await this._brandsService.findOneWebhook(query, data);
    return result;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  @Roles(UserRole.Admin, UserRole.SuperManager, UserRole.Company)
  async getList(
    @Query() query: any,
  ): Promise<Error | { list: BrandEntity[]; count: number }> {
    const res = await this._brandsService.getList(query);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  @Roles(UserRole.Admin, UserRole.SuperManager)
  async create(
    @Body(new SchemaValidationPipe(CreateBrandDto))
    payload: CreateBrandDto,
  ): Promise<Error | IBrand> {
    const res = await this._brandsService.createOne(payload);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:brandId')
  @Roles(UserRole.Admin, UserRole.SuperManager)
  async getBrand(
    @Param('brandId', ParseIntPipe) brandId: number,
  ): Promise<Error | BrandEntity> {
    const res = await this._brandsService.getBrand(brandId);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:brandId')
  @Roles(UserRole.Admin, UserRole.SuperManager)
  async updateBrand(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body(new SchemaValidationPipe(PartialUpdateBrandDto))
    updatePayload: PartialUpdateBrandDto,
  ): Promise<Error | BrandEntity> {
    const res = await this._brandsService.updateBrand(brandId, updatePayload);
    return res;
  }
}

export { BrandsController };
