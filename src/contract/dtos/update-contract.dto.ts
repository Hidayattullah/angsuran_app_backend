import { PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from './create-contract.dto';
import { IsDecimal, IsOptional, IsString, IsNumber, IsDateString, Min } from 'class-validator';

export class UpdateContractDto extends PartialType(CreateContractDto) {
  @IsString()
  @IsOptional()
  contractNumber?: string;  // Nomor unik untuk kontrak

  @IsString()
  @IsOptional()
  clientName?: string;       // Nama klien

  @IsDecimal({ decimal_digits: '2' })
  @IsOptional()
  otr?: number;              // Harga OTR (on the road price)
  
  @IsDecimal({ decimal_digits: '2' })
  @IsOptional()
  downPayment?: number;      // Uang muka

  @IsDecimal({ decimal_digits: '2' })
  @IsOptional()
  principalDebt?: number;    // Pokok Utang (OTR - Down Payment), bisa dihitung otomatis

  @IsDecimal({ decimal_digits: '2' })
  @IsOptional()
  interestRate?: number;     // Suku bunga, bisa dihitung otomatis berdasarkan durasi

  @IsDecimal({ decimal_digits: '2' })
  @IsOptional()
  monthlyInstallment?: number;  // Angsuran per bulan, bisa dihitung otomatis

  @IsNumber()
  @Min(1)
  @IsOptional()
  durationInMonths?: number; // Durasi kontrak dalam bulan

  @IsDateString()
  @IsOptional()
  startDate?: Date;          // Tanggal mulai kontrak

  @IsDateString()
  @IsOptional()
  endDate?: Date;            // Tanggal akhir kontrak
}
