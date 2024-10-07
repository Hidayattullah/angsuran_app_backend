// src/penalty/penalty.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PenaltyService } from './penalty.service';
import { PenaltyController } from './penalty.controller';
import { Penalty } from './entities/penalty.entity';
import { Installment } from '../installment/entities/installment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Penalty, Installment])],
  controllers: [PenaltyController],
  providers: [PenaltyService],
})
export class PenaltyModule {}
