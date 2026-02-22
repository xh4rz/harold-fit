import { PartialType } from '@nestjs/swagger';
import { CreateMuscleDto } from './create-muscle.dto';

export class UpdateMuscleDto extends PartialType(CreateMuscleDto) {}
