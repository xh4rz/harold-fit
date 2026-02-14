import { Controller, Get, Param } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Get('file/:id')
  getVideoUrl(@Param('id') publicId: string) {
    return this.cloudinaryService.getFileUrl(publicId, 'video');
  }
}
