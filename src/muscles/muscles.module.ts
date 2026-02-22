import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusclesService } from './muscles.service';
import { MusclesController } from './muscles.controller';
import { Muscle } from './entities/muscle.entity';

@Module({
  controllers: [MusclesController],
  providers: [MusclesService],
  imports: [TypeOrmModule.forFeature([Muscle])],
})
export class MusclesModule {}
