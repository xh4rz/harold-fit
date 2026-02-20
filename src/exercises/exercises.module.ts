import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Exercise, ExerciseVideo } from './entities';
import { CommonModule } from '../common/common.module';
import { AuthModule } from '../auth/auth.module';
import { Equipment } from '../equipments/entities/equipment.entity';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
  imports: [
    TypeOrmModule.forFeature([Exercise, ExerciseVideo, Equipment]),
    AuthModule,
    CloudinaryModule,
    CommonModule,
  ],
  exports: [ExercisesService, TypeOrmModule],
})
export class ExercisesModule {}
