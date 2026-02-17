import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileVideoFilter } from '../files/helpers';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PaginationDto } from '../common/dtos';
import { Auth } from '../auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Auth()
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Auth(ValidRoles.admin)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileVideoFilter,
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
      },
    }),
  )
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
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileVideoFilter,
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
      },
    }),
  )
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
