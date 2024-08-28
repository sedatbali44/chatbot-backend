import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ActiveUser } from '../auth/active-user.decorator';
import { User } from '../user/user.entity';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: Product,
  })
  @ApiBody({ type: Product })
  async create(
    @Body() product: Product,
    @ActiveUser() user: User,
  ): Promise<Product> {
    return this.productService.create(product, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Returns all products.',
    type: [Product],
  })
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns a product.',
    type: Product,
  })
  @ApiParam({ name: 'productId', description: 'ID of the product' })
  async findOne(@Param('productId') productId: string): Promise<Product> {
    return this.productService.findOne(productId);
  }

  @Put(':productId')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
    type: Product,
  })
  @ApiParam({ name: 'productId', description: 'ID of the product' })
  @ApiBody({ type: Product })
  async update(
    @Param('productId') productId: string,
    @Body() product: Product,
  ): Promise<Product> {
    return this.productService.update(productId, product);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get products by user ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns products belonging to a user.',
    type: [Product],
  })
  @ApiParam({ name: 'userId', description: 'ID of the user' })
  async findByUser(@Param('userId') userId: string): Promise<Product[]> {
    return this.productService.findByUser(userId);
  }
}
