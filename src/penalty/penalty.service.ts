// src/penalty/penalty.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Penalty } from './entities/penalty.entity';
import { CreatePenaltyDto } from './dtos/create-penalty.dto';
import { Installment } from '../installment/entities/installment.entity';

@Injectable()
export class PenaltyService {
  constructor(
    @InjectRepository(Penalty)
    private readonly penaltyRepository: Repository<Penalty>,

    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
  ) {}

  async create(createPenaltyDto: CreatePenaltyDto): Promise<Penalty> {
    const installment = await this.installmentRepository.findOne({
      where: { id: createPenaltyDto.installmentId },
    });

    if (!installment) {
      throw new NotFoundException('Installment not found');
    }

    const penalty = this.penaltyRepository.create({
      penaltyAmount: createPenaltyDto.penaltyAmount,
      penaltyReason: createPenaltyDto.penaltyReason,
      installment,
    });

    return this.penaltyRepository.save(penalty);
  }

  async findAll(): Promise<Penalty[]> {
    return this.penaltyRepository.find({ relations: ['installment'] });
  }

  async findOne(id: number): Promise<Penalty> {
    const penalty = await this.penaltyRepository.findOne({
      where: { id },
      relations: ['installment'],
    });

    if (!penalty) {
      throw new NotFoundException('Penalty not found');
    }

    return penalty;
  }

  async remove(id: number): Promise<void> {
    const result = await this.penaltyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Penalty not found');
    }
  }
}
