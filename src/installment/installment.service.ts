// src/installment/installment.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Installment } from './entities/installment.entity';
import { CreateInstallmentDto } from './dtos/create-installment.dto';
import { UpdateInstallmentDto } from './dtos/update-installment.dto'; // Import UpdateInstallmentDto

@Injectable()
export class InstallmentService {
  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
  ) {}

  // Menggunakan CreateInstallmentDto untuk create installment
  async create(createInstallmentDto: CreateInstallmentDto): Promise<{ message: string, installment: Installment }> {
    const installment = this.installmentRepository.create(createInstallmentDto);
    await this.installmentRepository.save(installment);
    return {
      message: 'Installment successfully created',
      installment,
    };
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

  // Menggunakan UpdateInstallmentDto untuk update installment
  async update(id: number, updateInstallmentDto: UpdateInstallmentDto): Promise<{ message: string, installment: Installment }> {
    const installment = await this.findOne(id);
    Object.assign(installment, updateInstallmentDto); // Menerapkan perubahan parsial
    await this.installmentRepository.save(installment);
    return {
      message: 'Installment successfully updated',
      installment,
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    const installment = await this.findOne(id);
    await this.installmentRepository.remove(installment);
    return { message: 'Installment successfully deleted' };
  }
}
