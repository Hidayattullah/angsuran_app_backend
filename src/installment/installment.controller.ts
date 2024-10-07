// src/installment/installment.controller.ts

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { InstallmentService } from './installment.service';
import { CreateInstallmentDto } from './dtos/create-installment.dto';


@Controller('installments')
export class InstallmentController {
  constructor(private readonly installmentService: InstallmentService) {}

  @Post()
  create(@Body() createInstallmentDto: CreateInstallmentDto) {
    return this.installmentService.create(createInstallmentDto);
  }

  @Get()
  findAll() {
    return this.installmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.installmentService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.installmentService.remove(id);
  }
}
