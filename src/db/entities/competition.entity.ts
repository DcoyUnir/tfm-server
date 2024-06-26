import { Entity, PrimaryColumn, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Result } from './result.entity';

@Entity()
export class Competition {
  @PrimaryGeneratedColumn()
  competitionId!: number;

  @PrimaryColumn({ type: 'varchar', unique: true })
  id!: string;

  @Column({ type: 'varchar' })
  code!: string;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  url!: string;

  @Column({ type: 'varchar' })
  organizer!: string;

  @Column({ type: 'varchar' })
  flagUrl!: string;

  @Column({ type: 'varchar' })
  location!: string;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'date' })
  updated!: string;

  @OneToMany(() => Result, result => result.competition)
  results!: Result[];
}
