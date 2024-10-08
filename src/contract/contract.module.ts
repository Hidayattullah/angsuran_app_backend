import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { Installment } from '../installment/entities/installment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contract, Installment]), // Import entitas yang dibutuhkan
  ],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
