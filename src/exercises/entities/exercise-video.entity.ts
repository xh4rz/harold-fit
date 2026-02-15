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
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @OneToOne(() => Exercise, (exercise) => exercise.video, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  exercise: Exercise;
}
