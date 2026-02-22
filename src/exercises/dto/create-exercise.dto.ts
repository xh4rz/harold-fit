import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsNumber()
  equipmentId: number;

  @IsNumber()
  primaryMuscleId: number;

  @Transform(({ value }) => value && JSON.parse(value))
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  secondaryMuscleIds?: number[];

  @Transform(({ value }) => value && JSON.parse(value))
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MinLength(10, { each: true })
  instruction: string[];
}
