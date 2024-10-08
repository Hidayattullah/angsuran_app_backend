import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dtos/create-contract.dto';
import { UpdateContractDto } from './dtos/update-contract.dto';


@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  // Endpoint untuk membuat kontrak baru
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractService.create(createContractDto);
  }

  // Endpoint untuk mendapatkan semua kontrak
  @Get()
  findAll() {
    return this.contractService.findAll();
  }

  // Endpoint untuk mendapatkan kontrak berdasarkan ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);  // Konversi ID menjadi number
  }

  // Endpoint untuk memperbarui kontrak berdasarkan ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(+id, updateContractDto);  // Konversi ID menjadi number
  }

  // Endpoint untuk menghapus kontrak berdasarkan ID
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);  // Konversi ID menjadi number
  }
}
