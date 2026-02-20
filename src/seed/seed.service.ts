import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import { ExercisesService } from 'src/exercises/exercises.service';
import { Exercise, ExerciseVideo } from 'src/exercises/entities';
import { Equipment } from '../equipments/entities/equipment.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,

    @InjectRepository(ExerciseVideo)
    private readonly exerciseVideoRepository: Repository<ExerciseVideo>,

    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,

    private readonly exercisesService: ExercisesService,
  ) {}

  async runSeed() {
    await this.deleteTables();

    await this.insertUsers();

    await this.insertEquipment();

    await this.insertNewExercies();

    return 'SEED EXECUTED';
  }

  private async deleteTables() {
    await this.exercisesService.deleteAllExercises();

    await this.equipmentRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    await this.userRepository.createQueryBuilder().delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users = await this.userRepository.save(seedUsers);

    return users;
  }

  private async insertEquipment() {
    const equipments = await this.equipmentRepository.save(
      initialData.equipments,
    );

    return equipments;
  }

  private async insertNewExercies() {
    const exercises = initialData.exercises;

    const exerciseEntities = await Promise.all(
      exercises.map(async (exercise) => {
        const equipment = await this.equipmentRepository.findOneBy({
          id: exercise.equipmentId,
        });

        if (!equipment)
          throw new Error(`Equipment not found: ${exercise.equipmentId}`);

        return this.exerciseRepository.create({
          ...exercise,
          equipment,
          video: this.exerciseVideoRepository.create({
            url: exercise.file.url,
            publicId: exercise.file.publicId,
          }),
        });
      }),
    );

    await this.exerciseRepository.save(exerciseEntities);

    return true;
  }
}
