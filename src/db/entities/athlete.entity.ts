import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Result } from './result.entity';

@Entity()
export class Athlete {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  name!: string;

  @OneToMany(() => Result, result => result.athlete)
  results!: Result[];
}
