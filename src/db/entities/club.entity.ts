import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Result } from './result.entity';


@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  name!: string;

  @Column({ type: 'varchar' })
  flagUrl!: string;

  @OneToMany(() => Result, result => result.club)
  results!: Result[];
}
