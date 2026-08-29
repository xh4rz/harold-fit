import { Gender } from '@/auth/interfaces';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(10)
  @MaxLength(50)
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  description?: string;

  @IsOptional()
  @IsEnum(Gender)
  @Type(() => Number)
  gender?: Gender;

  @IsOptional()
  @IsDateString()
  birthDate?: string;
}
