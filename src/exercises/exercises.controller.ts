import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipe,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PaginationDto } from '../common/dtos';
import { Auth } from '../auth/decorators';
import { VideoFileUpload } from '../common/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@ApiBearerAuth()
@Auth()
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Auth(ValidRoles.admin)
  @Post()
  @VideoFileUpload()
  create(
    @Body() createExerciseDto: CreateExerciseDto,
    @UploadedFile(new ParseFilePipe()) file: Express.Multer.File,
  ) {
    return this.exercisesService.create(createExerciseDto, file);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.exercisesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.exercisesService.findOne(id);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id')
  @VideoFileUpload()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.exercisesService.update(id, updateExerciseDto, file);
  }

  @Auth(ValidRoles.admin)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.exercisesService.remove(id);
  }
}
