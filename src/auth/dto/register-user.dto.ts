import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'xh4rz', minLength: 3, maxLength: 20 })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]*$/, {
    message:
      'Username must begin with a letter and may contain numbers or underscores (_)',
  })
  username: string;

  @ApiProperty({ example: 'Harold Gonzalez', minLength: 10 })
  @IsString()
  @MinLength(10)
  @MaxLength(50)
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Full name can only contain letters and spaces',
  })
  fullname: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsString()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ example: 'Password1', minLength: 6, maxLength: 20 })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    },
  )
  password: string;
}
