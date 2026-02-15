import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExerciseVideo } from './';

@Entity({ name: 'exercises' })
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column('text')
  equipment: string;

  @Column('text')
  primaryMuscle: string;

  @Column('text', {
    array: true,
    default: [],
  })
  secondaryMuscle?: string[];

  @Column('text', {
    array: true,
    nullable: false,
  })
  instruction: string[];

  @OneToOne(() => ExerciseVideo, (exerciseVideo) => exerciseVideo.exercise, {
    cascade: true,
    eager: true,
  })
  video: ExerciseVideo;
}
