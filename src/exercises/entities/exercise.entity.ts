import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('text')
  videoUrl: string;
}
