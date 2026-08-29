import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CloudinaryService } from '@/cloudinary/cloudinary.service';
import { UserImage } from './entities/user-image.entity';
import { DatabaseExceptionService } from '@/common/services';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(UserImage)
    private readonly userImageRepository: Repository<UserImage>,

    private readonly cloudinaryService: CloudinaryService,

    private readonly databaseExceptionService: DatabaseExceptionService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.save(createUserDto);

    return this.findByUserId(user.id);
  }

  async findByUserId(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.mapUserResponse(user);
  }

  async findByEmailForLogin(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: {
        password: true,
        id: true,
        email: true,
        username: true,
        fullname: true,
        isActive: true,
        roles: true,
        description: true,
        gender: true,
        birthDate: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.mapUserResponse(user);
  }

  async findForJwtValidation(userId: string) {
    return await this.usersRepository.findOneBy({
      id: userId,
    });
  }

  async findByIdWithRefreshToken(userId: string) {
    return await this.usersRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        refreshToken: true,
      },
    });
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    return await this.usersRepository.update(userId, {
      refreshToken,
    });
  }

  async findOneEntity(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException(`User with id "${id}" not found`);

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.findOneEntity(id);
      await this.usersRepository.update(id, updateUserDto);
      return this.findByUserId(id);
    } catch (error) {
      this.databaseExceptionService.handleDBExceptions(error);
    }
  }

  async updateProfileImage(id: string, file: Express.Multer.File) {
    const user = await this.findOneEntity(id);

    const uploadResult = await this.cloudinaryService.uploadFile(file, 'users');

    if (user.image) {
      const oldPublicId = user.image.publicId;

      await this.userImageRepository.update(user.image.id, {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      });

      if (oldPublicId) {
        await this.cloudinaryService.deleteFile(oldPublicId, 'image');
      }
    } else {
      const image = this.userImageRepository.create({
        publicId: uploadResult.public_id,
        url: uploadResult.secure_url,
        user,
      });

      await this.userImageRepository.save(image);
    }

    return {
      imageUrl: uploadResult.secure_url,
    };
  }

  async removeProfileImage(id: string) {
    const user = await this.findOneEntity(id);

    if (user.image) {
      await this.cloudinaryService.deleteFile(user.image.publicId, 'image');

      await this.userImageRepository.remove(user.image);
    }

    return {
      imageUrl: null,
    };
  }

  private mapUserResponse(user: User) {
    const { image, ...restUser } = user;

    return {
      ...restUser,
      imageUrl: image?.url ?? null,
    };
  }
}
