import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { Brand, BrandSchema } from './schemas/brand.schema';
import { MongooseModule } from '@nestjs/mongoose';  
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, JwtAuthGuard, JwtService],
  imports: [MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }])],
})
export class BrandsModule {}
