import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Exercise, ExerciseVideo } from './entities';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
  imports: [
    TypeOrmModule.forFeature([Exercise, ExerciseVideo]),
    CloudinaryModule,
    CommonModule,
  ],
  exports: [ExercisesService, TypeOrmModule],
})
export class ExercisesModule {}
