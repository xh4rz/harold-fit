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
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileVideoFilter } from 'src/files/helpers';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

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
  findAll() {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exercisesService.update(+id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(+id);
  }
}
