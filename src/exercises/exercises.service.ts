import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryResponse } from 'src/cloudinary/interfaces/cloudinary-response';
import { Exercise, ExerciseVideo } from './entities';
import { DatabaseExceptionService } from 'src/common/services';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,

    @InjectRepository(ExerciseVideo)
    private readonly exerciseVideoRepository: Repository<ExerciseVideo>,

    private readonly cloudinaryService: CloudinaryService,

    private readonly databaseExceptionService: DatabaseExceptionService,
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
        video: this.exerciseVideoRepository.create({
          url: uploadResult.secure_url,
        }),
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

      this.databaseExceptionService.handleDBExceptions(error);
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
      this.databaseExceptionService.handleDBExceptions(error);
    }
  }
}
