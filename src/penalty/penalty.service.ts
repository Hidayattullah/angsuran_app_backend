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
  async create(createPenaltyDto: CreatePenaltyDto): Promise<Penalty> {
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

    return this.penaltyRepository.save(penalty);
  }

  // Get all penalties
  findAll(): Promise<Penalty[]> {
    return this.penaltyRepository.find({ relations: ['installment'] });
  }

  // Get a single penalty by ID
  async findOne(id: number): Promise<Penalty> {
    const penalty = await this.penaltyRepository.findOne({ where: { id }, relations: ['installment'] });
    if (!penalty) {
      throw new NotFoundException(`Penalty with ID ${id} not found`);
    }
    return penalty;
  }

  // Update a penalty by ID
  async update(id: number, updatePenaltyDto: UpdatePenaltyDto): Promise<Penalty> {
    const penalty = await this.penaltyRepository.preload({
      id,
      ...updatePenaltyDto,
    });
    if (!penalty) {
      throw new NotFoundException(`Penalty with ID ${id} not found`);
    }

    return this.penaltyRepository.save(penalty);
  }

  // Delete a penalty by ID
  async remove(id: number): Promise<void> {
    const result = await this.penaltyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Penalty with ID ${id} not found`);
    }
  }
}
