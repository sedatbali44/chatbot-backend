import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() User: User): Promise<User> {
    return this.userService.create(User);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':UserId')
  async findOne(@Param('UserId') UserId: string): Promise<User> {
    return this.userService.findOne(UserId);
  }

  @Put(':UserId')
  async update(
    @Param('UserId') UserId: string,
    @Body() User: User,
  ): Promise<User> {
    return this.userService.update(UserId, User);
  }
}
