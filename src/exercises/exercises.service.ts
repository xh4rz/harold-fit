import { existsSync, unlinkSync } from 'fs';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  async create(
    createExerciseDto: CreateExerciseDto,
    videoUrl: string,
    filePath?: string,
  ) {
    try {
      const exercise = this.exerciseRepository.create({
        ...createExerciseDto,
        videoUrl,
      });

      await this.exerciseRepository.save(exercise);

      return exercise;
    } catch (error) {
      if (filePath && existsSync(filePath)) {
        unlinkSync(filePath);
      }

      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const exercises = await this.exerciseRepository.find({});

    return exercises;
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }

  async deleteAllExercises() {
    const query = this.exerciseRepository.createQueryBuilder('exercise');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    // this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
