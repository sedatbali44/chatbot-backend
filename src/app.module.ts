import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/nest',
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UserModule, // Include the User module
    ProductModule, // Include the Product module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
