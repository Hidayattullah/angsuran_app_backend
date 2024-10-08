import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Installment } from './entities/installment.entity';
import { CreateInstallmentDto } from './dtos/create-installment.dto';
import { UpdateInstallmentDto } from './dtos/update-installment.dto';
import { Contract } from '../contract/entities/contract.entity';

@Injectable()
export class InstallmentService {
  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,

    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) {}

  // Membuat cicilan baru
  async create(createInstallmentDto: CreateInstallmentDto, contractId: number): Promise<{ message: string; installment: Installment }> {
    const contract = await this.contractRepository.findOne({ where: { id: contractId } });

    if (!contract) {
      throw new NotFoundException(`Contract with ID ${contractId} not found`);
    }

    const installment = this.installmentRepository.create({
      ...createInstallmentDto,
      contract,
    });

    const savedInstallment = await this.installmentRepository.save(installment);

    return {
      message: `Installment for contract ID ${contractId} has been successfully created.`,
      installment: savedInstallment,
    };
  }

  // Mendapatkan semua cicilan
  async findAll(): Promise<{ message: string; installments: Installment[] }> {
    const installments = await this.installmentRepository.find({
      relations: ['contract'],  // Include contract dalam hasil pencarian
    });

    return {
      message: 'All installments have been retrieved successfully.',
      installments,
    };
  }

  // Mendapatkan cicilan berdasarkan ID
  async findOne(id: number): Promise<{ message: string; installment: Installment }> {
    const installment = await this.installmentRepository.findOne({
      where: { id },
      relations: ['contract'],
    });

    if (!installment) {
      throw new NotFoundException(`Installment with ID ${id} not found`);
    }

    return {
      message: `Installment with ID ${id} has been retrieved successfully.`,
      installment,
    };
  }

  // Memperbarui cicilan berdasarkan ID
  async update(id: number, updateInstallmentDto: UpdateInstallmentDto): Promise<{ message: string; installment: Installment }> {
    const installment = await this.findOne(id).then((res) => res.installment);

    Object.assign(installment, updateInstallmentDto);

    const updatedInstallment = await this.installmentRepository.save(installment);

    return {
      message: `Installment with ID ${id} has been updated successfully.`,
      installment: updatedInstallment,
    };
  }

  // Menghapus cicilan berdasarkan ID
  async remove(id: number): Promise<{ message: string }> {
    const installment = await this.findOne(id).then((res) => res.installment);

    await this.installmentRepository.remove(installment);

    return {
      message: `Installment with ID ${id} has been successfully removed.`,
    };
  }

  // Mendapatkan semua cicilan berdasarkan contract ID
  async findByContract(contractId: number): Promise<{ message: string; installments: Installment[] }> {
    const contract = await this.contractRepository.findOne({ where: { id: contractId } });

    if (!contract) {
      throw new NotFoundException(`Contract with ID ${contractId} not found`);
    }

    const installments = await this.installmentRepository.find({
      where: { contract },
    });

    return {
      message: `All installments for contract ID ${contractId} have been retrieved successfully.`,
      installments,
    };
  }
}
