// src/penalty/entities/penalty.entity.ts

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Installment } from '../../installment/entities/installment.entity';

@Entity()
export class Penalty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 12, scale: 2 })
  penaltyAmount: number;

  @Column()
  penaltyReason: string;

  @ManyToOne(() => Installment, installment => installment.penalties, { onDelete: 'CASCADE' })
  installment: Installment;
}
