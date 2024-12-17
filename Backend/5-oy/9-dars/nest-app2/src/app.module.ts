import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || 'postgres',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '123456',
      autoLoadModels: true,
      synchronize: true,
    }),
    ProductsModule,
  ],
})
export class AppModule {}
