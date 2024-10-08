import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PenaltyService } from './penalty.service';
import { CreatePenaltyDto } from './dtos/create-penalty.dto';
import { UpdatePenaltyDto } from './dtos/update-penalty.dto';


@Controller('penalties')
export class PenaltyController {
  constructor(private readonly penaltyService: PenaltyService) {}

  // Membuat penalty baru
  @Post()
  create(@Body() createPenaltyDto: CreatePenaltyDto) {
    return this.penaltyService.create(createPenaltyDto);
  }

  // Mendapatkan semua penalty
  @Get()
  findAll() {
    return this.penaltyService.findAll();
  }

  // Mendapatkan penalty berdasarkan ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.penaltyService.findOne(+id);
  }

  // Mengupdate penalty berdasarkan ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePenaltyDto: UpdatePenaltyDto) {
    return this.penaltyService.update(+id, updatePenaltyDto);
  }

  // Menghapus penalty berdasarkan ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.penaltyService.remove(+id);
  }
}
