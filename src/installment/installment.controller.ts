import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { InstallmentService } from './installment.service';
import { CreateInstallmentDto } from './dtos/create-installment.dto';
import { UpdateInstallmentDto } from './dtos/update-installment.dto';


@Controller('installments')
export class InstallmentController {
  constructor(private readonly installmentService: InstallmentService) {}

  // Membuat cicilan baru dengan contractId
  @Post(':contractId')
  async create(
    @Param('contractId') contractId: number,
    @Body() createInstallmentDto: CreateInstallmentDto,
  ) {
    return this.installmentService.create(createInstallmentDto, contractId);
  }

  // Mendapatkan semua cicilan
  @Get()
  async findAll() {
    return this.installmentService.findAll();
  }

  // Mendapatkan satu cicilan berdasarkan ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.installmentService.findOne(id);
  }

  // Mendapatkan semua cicilan berdasarkan contract ID
  @Get('contract/:contractId')
  async findByContract(@Param('contractId') contractId: number) {
    return this.installmentService.findByContract(contractId);
  }

  // Memperbarui cicilan berdasarkan ID
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInstallmentDto: UpdateInstallmentDto,
  ) {
    return this.installmentService.update(id, updateInstallmentDto);
  }

  // Menghapus cicilan berdasarkan ID
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.installmentService.remove(id);
  }
}
