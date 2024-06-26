import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Athlete } from './athlete.entity';
import { Club } from './club.entity';
import { Competition } from './competition.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Competition, competition => competition.results)
  competition!: Competition;

  @ManyToOne(() => Athlete, athlete => athlete.results)
  athlete!: Athlete;

  @ManyToOne(() => Club, club => club.results)
  club!: Club;

  @Column({ type: 'varchar' })
  finalPosition!: string;

  @Column({ type: 'varchar' })
  category!: string;

  @Column({ type: 'varchar' })
  total!: string;

  @Column({ type: 'varchar' })
  total10s!: string;

  @Column({ type: 'varchar' })
  total9s!: string;

  @Column({ type: 'varchar' })
  result1!: string;

  @Column({ type: 'varchar' })
  result2!: string;

  @Column({ type: 'varchar' })
  positionAfter1!: string;

  @Column({ type: 'varchar' })
  positionAfter2!: string;
}
