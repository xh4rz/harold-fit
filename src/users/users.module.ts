import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UserImage } from './entities/user-image.entity';
import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { CommonModule } from '@/common/common.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, UserImage]),
    CloudinaryModule,
    CommonModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
