// src/penalty/penalty.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'; // Tambahkan `Put`
import { PenaltyService } from './penalty.service';
import { CreatePenaltyDto } from './dtos/create-penalty.dto';
import { UpdatePenaltyDto } from './dtos/update-penalty.dto'; // Import UpdatePenaltyDto
import { Penalty } from './entities/penalty.entity';

@Controller('penalties')
export class PenaltyController {
  constructor(private readonly penaltyService: PenaltyService) {}

  @Post()
  create(@Body() createPenaltyDto: CreatePenaltyDto): Promise<{ message: string, penalty: Penalty }> {
    return this.penaltyService.create(createPenaltyDto);
  }

  @Get()
  findAll(): Promise<Penalty[]> {
    return this.penaltyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Penalty> {
    return this.penaltyService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number, 
    @Body() updatePenaltyDto: UpdatePenaltyDto
  ): Promise<{ message: string, penalty: Penalty }> {
    return this.penaltyService.update(id, updatePenaltyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.penaltyService.remove(id);
  }
}
