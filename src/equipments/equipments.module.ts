import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';

@Module({
  controllers: [EquipmentsController],
  providers: [EquipmentsService],
  imports: [TypeOrmModule.forFeature([Equipment])],
})
export class EquipmentsModule {}
