import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExerciseVideo } from './';
import { Equipment } from '../../equipments/entities/equipment.entity';

@Entity({ name: 'exercises' })
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

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

  @Column({ name: 'equipmentId', select: false })
  equipmentId: number;

  @ManyToOne(() => Equipment, (equipment) => equipment.exercises, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'equipmentId' })
  equipment: Equipment;
}
