// src/installment/installment.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Installment } from './entities/installment.entity';
import { CreateInstallmentDto } from './dtos/create-installment.dto';


@Injectable()
export class InstallmentService {
  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
  ) {}

  async create(createInstallmentDto: CreateInstallmentDto): Promise<Installment> {
    const installment = this.installmentRepository.create(createInstallmentDto);
    return this.installmentRepository.save(installment);
  }

  async findAll(): Promise<Installment[]> {
    return this.installmentRepository.find({ relations: ['contract'] });
  }

  async findOne(id: number): Promise<Installment> {
    const installment = await this.installmentRepository.findOne({
      where: { id },
      relations: ['contract'],
    });
    if (!installment) {
      throw new NotFoundException(`Installment with ID ${id} not found`);
    }
    return installment;
  }

  async remove(id: number): Promise<void> {
    const installment = await this.findOne(id);
    await this.installmentRepository.remove(installment);
  }
}
