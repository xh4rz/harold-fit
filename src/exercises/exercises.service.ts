import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryResponse } from 'src/cloudinary/interfaces/cloudinary-response';

@Injectable()
export class ExercisesService {
  private readonly logger = new Logger('ExercisesService');

  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createExerciseDto: CreateExerciseDto,
    file: Express.Multer.File,
  ) {
    let uploadResult: CloudinaryResponse | undefined;

    try {
      uploadResult = await this.cloudinaryService.uploadFile(file);

      const exercise = this.exerciseRepository.create({
        ...createExerciseDto,
        videoUrl: uploadResult.secure_url,
      });

      await this.exerciseRepository.save(exercise);

      return exercise;
    } catch (error) {
      if (uploadResult?.public_id) {
        await this.cloudinaryService.deleteFile(
          uploadResult.public_id,
          'video',
        );
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

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
