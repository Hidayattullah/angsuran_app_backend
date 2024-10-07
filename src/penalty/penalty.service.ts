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

  async create(createPenaltyDto: CreatePenaltyDto): Promise<{ message: string, penalty: Penalty }> {
    const installment = await this.installmentRepository.findOne({
      where: { id: createPenaltyDto.installmentId },
    });
  
    console.log('Installment:', installment); // Tambahkan ini untuk cek apakah installment ditemukan
  
    if (!installment) {
      throw new NotFoundException('Installment not found');
    }
  
    const penalty = this.penaltyRepository.create({
      penaltyAmount: createPenaltyDto.penaltyAmount,
      penaltyReason: createPenaltyDto.penaltyReason,
      installment,
    });
  
    await this.penaltyRepository.save(penalty);
    return {
      message: 'Penalty successfully created',
      penalty,
    };
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

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.penaltyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Penalty not found');
    }
    return { message: 'Penalty successfully deleted' };
  }
}

