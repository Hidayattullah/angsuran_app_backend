// src/installment/installment.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstallmentService } from './installment.service';
import { InstallmentController } from './installment.controller';
import { Installment } from './entities/installment.entity';
import { Contract } from '../contract/entities/contract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Installment, Contract])],
  controllers: [InstallmentController],
  providers: [InstallmentService],
})
export class InstallmentModule {}
