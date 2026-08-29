import { User } from '@/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users_images',
})
export class UserImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  url: string;

  @Column('text')
  publicId: string;

  @OneToOne(() => User, (user) => user.image, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
