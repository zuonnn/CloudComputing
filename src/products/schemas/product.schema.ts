
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';
import { Brand } from 'src/brands/schemas/brand.schema';
import { Category } from 'src/categories/schemas/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product{
  @Prop({ required: true })
  name: string;

  @Prop()
  type: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop()
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true })
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true })
  brand: Brand;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
