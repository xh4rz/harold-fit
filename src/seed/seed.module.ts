import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ExercisesModule } from 'src/exercises/exercises.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AuthModule, ExercisesModule],
})
export class SeedModule {}
