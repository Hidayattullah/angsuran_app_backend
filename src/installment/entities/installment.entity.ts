import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Contract } from '../../contract/entities/contract.entity';
import { Penalty } from '../../penalty/entities/penalty.entity';

@Entity()
export class Installment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  installmentNo: number;  // Nomor cicilan dalam kontrak

  @Column('decimal', { precision: 12, scale: 2 })
  amountPerMonth: number;  // Jumlah cicilan per bulan (termasuk pokok dan bunga)

  @Column('decimal', { precision: 5, scale: 2 })
  interestRate: number;  // Suku bunga cicilan

  @Column('decimal', { precision: 12, scale: 2 })
  principalAmount: number;  // Jumlah pokok cicilan

  @Column('date')
  dueDate: Date;  // Tanggal jatuh tempo cicilan

  @Column({ default: 'PENDING' })
  status: string;  // Status cicilan (misal: PENDING, PAID, dll.)

  @Column('boolean', { default: false })
  isPaidOff: boolean;  // Apakah cicilan sudah lunas

  // Relasi many-to-one dengan Contract
  @ManyToOne(() => Contract, contract => contract.installments, { onDelete: 'CASCADE' })
  contract: Contract;  // Setiap cicilan terhubung dengan satu kontrak

  // Relasi one-to-many dengan Penalties
  @OneToMany(() => Penalty, penalty => penalty.installment, { cascade: true })
  penalties: Penalty[];  // Cicilan dapat memiliki banyak penalti
}
