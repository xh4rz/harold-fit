import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Exercise } from '../../exercises/entities';

@Entity({ name: 'equipments' })
export class Equipment {
  @PrimaryColumn()
  id: number;

  @Column('text')
  name: string;

  @OneToMany(() => Exercise, (exercise) => exercise.equipment)
  exercises: Exercise[];
}
