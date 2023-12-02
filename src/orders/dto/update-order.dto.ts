import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderDetailDto {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}

export class UpdateOrderDto {
  @IsArray()
  @Type(() => UpdateOrderDetailDto)
  orderDetails: UpdateOrderDetailDto[];

  @IsNotEmpty()
  @IsNumber()
  orderTotalPrice: number;
}
