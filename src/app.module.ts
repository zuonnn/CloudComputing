import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://manager:123@cloudcomputing.twgpuiv.mongodb.net/api?retryWrites=true&w=majority'),
    UsersModule,
    ProductsModule,
    BrandsModule,
    OrdersModule,
    AuthModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
