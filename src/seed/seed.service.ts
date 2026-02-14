import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import { ExercisesService } from 'src/exercises/exercises.service';
import { Exercise } from 'src/exercises/entities/exercise.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
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

    await this.exerciseRepository.save(exercises);

    return true;
  }
}
