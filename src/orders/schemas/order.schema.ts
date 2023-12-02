import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';

@Schema()
export class OrderDetail {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true })
  product: Product;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  totalPrice: number;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);

@Schema({timestamps: true})
export class Order {
  @Prop({ type: [OrderDetailSchema], required: true })
  orderDetails: OrderDetail[];

  @Prop({ required: true })
  orderTotalPrice: number;
}

export type OrderDocument = HydratedDocument<Order>;
export const OrderSchema = SchemaFactory.createForClass(Order);
