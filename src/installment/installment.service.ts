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
  async create(createInstallmentDto: CreateInstallmentDto, contractId: number): Promise<Installment> {
    const contract = await this.contractRepository.findOne({ where: { id: contractId } });

    if (!contract) {
      throw new NotFoundException(`Contract with ID ${contractId} not found`);
    }

    const installment = this.installmentRepository.create({
      ...createInstallmentDto,
      contract,
    });

    return this.installmentRepository.save(installment);
  }

  // Mendapatkan semua cicilan
  findAll(): Promise<Installment[]> {
    return this.installmentRepository.find({
      relations: ['contract'],  // Include contract dalam hasil pencarian
    });
  }

  // Mendapatkan cicilan berdasarkan ID
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

  // Memperbarui cicilan berdasarkan ID
  async update(id: number, updateInstallmentDto: UpdateInstallmentDto): Promise<Installment> {
    const installment = await this.findOne(id);

    Object.assign(installment, updateInstallmentDto);

    return this.installmentRepository.save(installment);
  }

  // Menghapus cicilan berdasarkan ID
  async remove(id: number): Promise<void> {
    const installment = await this.findOne(id);

    await this.installmentRepository.remove(installment);
  }

  // Mendapatkan semua cicilan berdasarkan contract ID
  async findByContract(contractId: number): Promise<Installment[]> {
    const contract = await this.contractRepository.findOne({ where: { id: contractId } });

    if (!contract) {
      throw new NotFoundException(`Contract with ID ${contractId} not found`);
    }

    return this.installmentRepository.find({
      where: { contract },
    });
  }
}
