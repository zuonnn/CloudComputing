import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    country: string;
}
