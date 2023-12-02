import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    await createdOrder.populate('orderDetails.product');
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('orderDetails.product').exec();
  }

  async findOne(id: string): Promise<Order | null> {
    try {
      return await this.orderModel.findById(id).populate('orderDetails.product').exec();
    } catch (error) {
      return null;
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
    const existingOrder = await this.orderModel.findById(id).exec();

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    existingOrder.set(updateOrderDto);
    return existingOrder.save();
  }

  async remove(id: string): Promise<Order | null> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();

    if (!deletedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return deletedOrder;
  }
}
