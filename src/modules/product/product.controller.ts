import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':productId')
  async findOne(@Param('productId') productId: string): Promise<Product> {
    return this.productService.findOne(productId);
  }

  @Put(':productId')
  async update(
    @Param('productId') productId: string,
    @Body() product: Product,
  ): Promise<Product> {
    return this.productService.update(productId, product);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<Product[]> {
    return this.productService.findByUser(userId);
  }
}
