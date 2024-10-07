// src/penalty/penalty.controller.ts

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PenaltyService } from './penalty.service';
import { CreatePenaltyDto } from './dtos/create-penalty.dto';
import { Penalty } from './entities/penalty.entity';

@Controller('penalties')
export class PenaltyController {
  constructor(private readonly penaltyService: PenaltyService) {}

  @Post()
  create(@Body() createPenaltyDto: CreatePenaltyDto): Promise<Penalty> {
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

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.penaltyService.remove(id);
  }
}
