import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(3)
  equipment: string;

  @IsString()
  @MinLength(3)
  primaryMuscle: string;

  @IsArray()
  @IsOptional()
  secondaryMuscle?: string[];

  @Transform(({ value }) =>
    typeof value === 'string' ? JSON.parse(value) : value,
  )
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MinLength(10, { each: true })
  instruction: string[];
}
