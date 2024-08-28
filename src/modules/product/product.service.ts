import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ActiveUser } from './../auth/active-user.decorator';
import { User } from '../user/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(product: Product, user: User): Promise<Product> {
    product.createdAt = new Date();
    product.updatedAt = new Date();
    //product.userId = userId;
    console.log('user:', user);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepository.findOneById(id);
  }

  async update(productId: string, product: Product): Promise<Product> {
    product.updatedAt = new Date();
    await this.productRepository.update(productId, product);
    return this.findOne(productId);
  }

  async findByUser(userId: string): Promise<Product[]> {
    return this.productRepository.find({ where: { userId } });
  }
}
