import { Installment } from 'src/installment/entities/installment.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contracts')
export class Contract extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  contractNumber: string;  // Nomor unik untuk kontrak

  @Column()
  clientName: string;       // Nama klien

  @Column('decimal', { precision: 15, scale: 2 })
  otr: number;              // Harga OTR (on the road price)
  
  @Column('decimal', { precision: 15, scale: 2 })
  downPayment: number;      // Uang muka

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  principalDebt: number;    // Pokok Utang (OTR - Down Payment)

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  interestRate: number;     // Suku bunga (berdasarkan durasi kontrak)

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  monthlyInstallment: number; // Angsuran per bulan

  @Column()
  durationInMonths: number; // Durasi kontrak dalam bulan

  @Column('date')
  startDate: Date;          // Tanggal mulai kontrak

  @Column('date')
  endDate: Date;            // Tanggal akhir kontrak

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;          // Tanggal kontrak dibuat

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date;          // Tanggal kontrak terakhir diperbarui

  // Relasi one-to-many dengan Installments
  @OneToMany(() => Installment, installment => installment.contract, { cascade: true })
  installments: Installment[];  // Kontrak memiliki banyak cicilan
}
