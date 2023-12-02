import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ timestamps: true })
export class Brand{
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  country: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
