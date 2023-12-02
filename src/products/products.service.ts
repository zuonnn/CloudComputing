import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    await createdProduct.populate(['category','brand']);
    return createdProduct.save();
  }
  

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate(['category','brand']).exec();
  }  

  async findOne(id: string): Promise<Product | null> {
    return this.productModel.findById(id).populate(['category','brand']).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
    const existingProduct = await this.productModel.findById(id).exec();

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    existingProduct.set(updateProductDto);
    return existingProduct.save();
  }

  async remove(id: string): Promise<Product | null> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();

    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return deletedProduct;
  }
}
