import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from './';

@Entity({
  name: 'exercises_videos',
})
export class ExerciseVideo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  url: string;

  @Column('text')
  publicId: string;

  @OneToOne(() => Exercise, (exercise) => exercise.video, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  exercise: Exercise;
}
