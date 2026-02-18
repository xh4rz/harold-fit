import { HttpException, HttpStatus } from '@nestjs/common';

export const fileVideoFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('file is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];

  const validExtensions = ['mp4', 'mov', 'avi', 'webm', 'mkv'];

  if (!validExtensions.includes(fileExtension)) {
    return callback(
      new HttpException(
        `${file.mimetype} is not a valid video format`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      ),
      false,
    );
  }

  callback(null, true);
};
