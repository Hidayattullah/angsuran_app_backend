// src/contract/dto/create-contract.dto.ts

import { IsNotEmpty, IsNumber, IsString, IsDate, Min, Max, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateContractDto {
  @IsNotEmpty()
  @IsString()
  contractNumber: string;    // Nomor kontrak unik

  @IsNotEmpty()
  @IsString()
  clientName: string;        // Nama klien

  @IsNotEmpty()
  @IsDecimal()
  otr: number;               // Harga OTR

  @IsNotEmpty()
  @IsDecimal()
  downPayment: number;       // Uang muka

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(120)
  durationInMonths: number;  // Durasi kontrak (minimal 1 bulan, maksimal 120 bulan)

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;           // Tanggal mulai kontrak

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDate: Date;             // Tanggal akhir kontrak
}
