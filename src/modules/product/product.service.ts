import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @Inject(UserService)
    private readonly usersService: UserService,
  ) {}

  async create(product: Product, user: User): Promise<Product> {
    const activeUser = await this.usersService.findByEmail(user?.email);
    const currentDate = new Date();
    product.createdAt = currentDate;
    product.updatedAt = currentDate;
    product.userId = activeUser.id.toString();
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
