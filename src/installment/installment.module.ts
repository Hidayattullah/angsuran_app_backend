import { Module } from '@nestjs/common';
import { InstallmentService } from './installment.service';
import { InstallmentController } from './installment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Installment } from './entities/installment.entity';
import { Contract } from '../contract/entities/contract.entity';
import { Penalty } from '../penalty/entities/penalty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Installment, Contract, Penalty]), // Import entitas yang dibutuhkan
  ],
  controllers: [InstallmentController],
  providers: [InstallmentService],
})
export class InstallmentModule {}
