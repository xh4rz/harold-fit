import { join } from 'path';
import { existsSync } from 'fs';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  getStaticExerciseVideo(videoName: string) {
    const path = join(__dirname, '../../static/exercises', videoName);

    if (!existsSync(path))
      throw new BadRequestException(
        `No exercise found with video ${videoName}`,
      );
    return path;
  }
}
