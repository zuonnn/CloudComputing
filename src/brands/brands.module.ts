import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { Brand, BrandSchema } from './schemas/brand.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
  imports: [MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }])],
})
export class BrandsModule {}
