import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from './schemas/brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const createdBrand = new this.brandModel(createBrandDto);
    return createdBrand.save();
  }

  async findAll(): Promise<Brand[]> {
    return this.brandModel.find().exec();
  }

  async findOne(id: string): Promise<Brand | null> {
    try {
      return await this.brandModel.findById(id).exec();
    } catch (error) {
      return null;
    }
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand | null> {
    try {
      const existingBrand = await this.brandModel.findById(id).exec();

      if (!existingBrand) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }

      existingBrand.set(updateBrandDto);
      return existingBrand.save();
    } catch (error) {
      return null;
    }
  }

  async remove(id: string): Promise<Brand | null> {
    try {
      const deletedBrand = await this.brandModel.findByIdAndDelete(id).exec();

      if (!deletedBrand) {
        throw new NotFoundException(`Brand with ID ${id} not found`);
      }

      return deletedBrand;
    } catch (error) {
      return null;
    }
  }
}
