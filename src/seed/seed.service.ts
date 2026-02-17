import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import { ExercisesService } from 'src/exercises/exercises.service';
import { Exercise, ExerciseVideo } from 'src/exercises/entities';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,

    @InjectRepository(ExerciseVideo)
    private readonly exerciseVideoRepository: Repository<ExerciseVideo>,

    private readonly exercisesService: ExercisesService,
  ) {}

  async runSeed() {
    await this.deleteTables();

    const adminUser = await this.insertUsers();

    await this.insertNewExercies();

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.exercisesService.deleteAllExercises();

    const queryBuilder = this.userRepository.createQueryBuilder();

    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users = await this.userRepository.save(seedUsers);

    return users[0];
  }

  private async insertNewExercies() {
    await this.exercisesService.deleteAllExercises();

    const exercises = initialData.exercises;

    const exercise = exercises.map((exercise) =>
      this.exerciseRepository.create({
        ...exercise,
        video: this.exerciseVideoRepository.create({
          url: exercise.file.url,
          publicId: exercise.file.publicId,
        }),
      }),
    );

    await this.exerciseRepository.save(exercise);

    return true;
  }
}
