import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from '../dto';

export function AuthResponses(description: string) {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: `${description} successful. Returns user data and JWT token.`,
      type: AuthResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
  );
}
