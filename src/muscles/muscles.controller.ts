import { Controller, Get } from '@nestjs/common';
import { MusclesService } from './muscles.service';

@Controller('muscles')
export class MusclesController {
  constructor(private readonly musclesService: MusclesService) {}

  @Get()
  findAll() {
    return this.musclesService.findAll();
  }
}
