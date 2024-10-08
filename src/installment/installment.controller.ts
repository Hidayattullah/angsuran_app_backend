// src/installment/installment.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { InstallmentService } from './installment.service';
import { CreateInstallmentDto } from './dtos/create-installment.dto';
import { UpdateInstallmentDto } from './dtos/update-installment.dto'; // Import UpdateInstallmentDto

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

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateInstallmentDto: UpdateInstallmentDto) {
    return this.installmentService.update(id, updateInstallmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.installmentService.remove(id);
  }
}
