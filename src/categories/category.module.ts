import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories.module';

@Module({
  imports: [CategoriesModule]
})
export class CategoryModule {}
