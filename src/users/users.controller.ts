import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth, GetUser } from '@/auth/decorators';
import { ImageFileUpload } from '@/common/decorators';

@Auth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('profile')
  findByUserId(@GetUser('id') userId: string) {
    return this.usersService.findByUserId(userId);
  }

  @Patch('profile-image')
  @ImageFileUpload()
  updateProfileImage(
    @GetUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.updateProfileImage(userId, file);
  }

  @Delete('profile-image')
  removeProfileImage(@GetUser('id') userId: string) {
    return this.usersService.removeProfileImage(userId);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
