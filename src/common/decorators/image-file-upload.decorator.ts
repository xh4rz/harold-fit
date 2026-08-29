import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileImageFilter } from '../helpers';

export const ImageFileUpload = () => {
  return UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileImageFilter,
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
      },
    }),
  );
};
