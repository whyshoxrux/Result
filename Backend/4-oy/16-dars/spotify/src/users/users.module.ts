import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from 'src/common/service/mail.service';
import { SharingModule } from 'src/common/sharing.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), SharingModule],
  controllers: [UsersController],
  providers: [UsersService, EmailService],
})
export class UsersModule {}
