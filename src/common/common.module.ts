import { Module } from '@nestjs/common';
import { DatabaseExceptionService } from './services';

@Module({
  providers: [DatabaseExceptionService],
  exports: [DatabaseExceptionService],
})
export class CommonModule {}
