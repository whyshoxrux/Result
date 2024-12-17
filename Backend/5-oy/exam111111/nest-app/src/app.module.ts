import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      database: 'postgres',
      username: 'postgres',
      password: '123456',
      host: '127.0.0.1',
      port: 5432,
      autoLoadModels: true,
      synchronize: true,
      // sync: { force: true },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'uploads'),
      serveRoot: '/static',
    }),
    VideosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
