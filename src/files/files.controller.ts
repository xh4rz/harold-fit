import type { Response } from 'express';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('exercise/:videoName')
  findExerciseVideo(
    @Res() res: Response,
    @Param('videoName') videoName: string,
  ) {
    const path = this.filesService.getStaticExerciseVideo(videoName);

    res.sendFile(path);
  }
}
