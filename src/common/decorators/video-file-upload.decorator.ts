import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileVideoFilter } from 'src/common/helpers';

export const VideoFileUpload = () => {
  return UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileVideoFilter,
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
      },
    }),
  );
};
