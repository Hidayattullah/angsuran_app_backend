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

  async create(createContractDto: CreateContractDto): Promise<{ message: string, contract: Contract }> {
    const contract = this.contractRepository.create(createContractDto);
    await this.contractRepository.save(contract);
    return {
      message: 'Contract successfully created',
      contract,
    };
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

  async update(id: number, updateContractDto: UpdateContractDto): Promise<{ message: string, contract: Contract }> {
    const contract = await this.findOne(id);
  
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }
  
    // Update only the fields that are present in updateContractDto
    Object.assign(contract, updateContractDto);
  
    await this.contractRepository.save(contract);
    return {
      message: 'Contract successfully updated',
      contract,
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    const contract = await this.findOne(id);
    await this.contractRepository.remove(contract);
    return { message: 'Contract successfully deleted' };
  }
}

