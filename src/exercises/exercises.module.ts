import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { Exercise } from './entities/exercise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
  imports: [TypeOrmModule.forFeature([Exercise])],
  exports: [ExercisesService],
})
export class ExercisesModule {}
