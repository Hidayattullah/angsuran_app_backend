import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Installment } from '../../installment/entities/installment.entity';

@Entity('penalties')
export class Penalty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 15, scale: 2 })
  penaltyAmount: number;  // Jumlah penalti

  @Column()
  penaltyReason: string;  // Alasan pemberian penalti

  @Column('date', { nullable: true })
  penaltyDate: Date;  // Tanggal penalti dikenakan

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;  // Tanggal penalti dibuat

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
  updatedAt: Date;  // Tanggal penalti terakhir diperbarui

  // Relasi many-to-one dengan Installment
  @ManyToOne(() => Installment, installment => installment.penalties, { onDelete: 'CASCADE' })
  installment: Installment;  // Setiap penalti terkait dengan satu cicilan
}
