// src/contract/contract.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { CreateContractDto } from './dtos/create-contract.dto';
import { UpdateContractDto } from './dtos/update-contract.dto';


@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) {}

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    const contract = this.contractRepository.create(createContractDto);
    return this.contractRepository.save(contract);
  }

  async findAll(): Promise<Contract[]> {
    return this.contractRepository.find();
  }

  async findOne(id: number): Promise<Contract> {
    const contract = await this.contractRepository.findOneBy({ id });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }
    return contract;
  }

  async update(id: number, updateContractDto: UpdateContractDto): Promise<Contract> {
    const contract = await this.contractRepository.preload({
      id: id,
      ...updateContractDto,
    });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }
    return this.contractRepository.save(contract);
  }

  async remove(id: number): Promise<void> {
    const contract = await this.findOne(id);
    await this.contractRepository.remove(contract);
  }
}
