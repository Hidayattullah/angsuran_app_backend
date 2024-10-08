import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Penalty } from './entities/penalty.entity';
import { CreatePenaltyDto } from './dtos/create-penalty.dto';
import { UpdatePenaltyDto } from './dtos/update-penalty.dto';
import { Installment } from 'src/installment/entities/installment.entity';

@Injectable()
export class PenaltyService {
  constructor(
    @InjectRepository(Penalty)
    private readonly penaltyRepository: Repository<Penalty>,

    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
  ) {}

  // Create a new penalty
  async create(createPenaltyDto: CreatePenaltyDto): Promise<{ message: string; penalty: Penalty }> {
    const { installmentId, ...penaltyData } = createPenaltyDto;
    
    // Find the related installment
    const installment = await this.installmentRepository.findOneBy({ id: installmentId });
    if (!installment) {
      throw new NotFoundException(`Installment with ID ${installmentId} not found`);
    }

    // Create a new penalty
    const penalty = this.penaltyRepository.create({
      ...penaltyData,
      installment,  // Assign the related installment
    });

    const savedPenalty = await this.penaltyRepository.save(penalty);

    return {
      message: `Penalty for installment ID ${installmentId} has been successfully created.`,
      penalty: savedPenalty,
    };
  }

  // Get all penalties
  async findAll(): Promise<{ message: string; penalties: Penalty[] }> {
    const penalties = await this.penaltyRepository.find({ relations: ['installment'] });

    return {
      message: 'All penalties have been retrieved successfully.',
      penalties,
    };
  }

  // Get a single penalty by ID
  async findOne(id: number): Promise<{ message: string; penalty: Penalty }> {
    const penalty = await this.penaltyRepository.findOne({ where: { id }, relations: ['installment'] });
    if (!penalty) {
      throw new NotFoundException(`Penalty with ID ${id} not found`);
    }
    
    return {
      message: `Penalty with ID ${id} has been retrieved successfully.`,
      penalty,
    };
  }

  // Update a penalty by ID
  async update(id: number, updatePenaltyDto: UpdatePenaltyDto): Promise<{ message: string; penalty: Penalty }> {
    const penalty = await this.penaltyRepository.preload({
      id,
      ...updatePenaltyDto,
    });
    if (!penalty) {
      throw new NotFoundException(`Penalty with ID ${id} not found`);
    }

    const updatedPenalty = await this.penaltyRepository.save(penalty);

    return {
      message: `Penalty with ID ${id} has been updated successfully.`,
      penalty: updatedPenalty,
    };
  }

  // Delete a penalty by ID
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.penaltyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Penalty with ID ${id} not found`);
    }

    return {
      message: `Penalty with ID ${id} has been successfully removed.`,
    };
  }
}
