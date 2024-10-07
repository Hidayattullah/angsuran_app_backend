// src/installment/entities/installment.entity.ts

import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Contract } from '../../contract/entities/contract.entity';
import { Penalty } from '../../penalty/entities/penalty.entity';

@Entity()
export class Installment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  installmentNo: number;

  @Column('decimal', { precision: 12, scale: 2 })
  amountPerMonth: number;

  @Column()
  dueDate: Date;

  @ManyToOne(() => Contract, contract => contract.installments, { onDelete: 'CASCADE' })
  contract: Contract;

  @OneToMany(() => Penalty, penalty => penalty.installment, { cascade: true })
  penalties: Penalty[];
}
