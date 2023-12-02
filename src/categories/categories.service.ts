import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category | null> {
    try {
      return await this.categoryModel.findById(id).exec();
    } catch (error) {
      return null;
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
    try {
      const existingCategory = await this.categoryModel.findById(id).exec();

      if (!existingCategory) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      existingCategory.set(updateCategoryDto);
      return existingCategory.save();
    } catch (error) {
      return null;
    }
  }

  async remove(id: string): Promise<Category | null> {
    try {
      const deletedCategory = await this.categoryModel.findByIdAndDelete(id).exec();

      if (!deletedCategory) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      return deletedCategory;
    } catch (error) {
      return null;
    }
  }
}
