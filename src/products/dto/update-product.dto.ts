import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    type?: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    category: Types.ObjectId;

    @IsNotEmpty()
    brand: Types.ObjectId;
}
