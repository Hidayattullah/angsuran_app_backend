import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString, Min } from 'class-validator';

export class CreateContractDto {
  @IsString()
  @IsNotEmpty()
  contractNumber: string;  // Nomor unik untuk kontrak

  @IsString()
  @IsNotEmpty()
  clientName: string;       // Nama klien

  @IsDecimal({ decimal_digits: '2' })
  @IsNotEmpty()
  otr: number;              // Harga OTR (on the road price)
  
  @IsDecimal({ decimal_digits: '2' })
  @IsNotEmpty()
  downPayment: number;      // Uang muka

  @IsDecimal({ decimal_digits: '2' })
  @IsOptional()
  principalDebt?: number;   // Pokok Utang (OTR - Down Payment), bisa dihitung otomatis

  @IsDecimal({ decimal_digits: '2' })
  @IsOptional()
  interestRate?: number;    // Suku bunga, bisa dihitung otomatis berdasarkan durasi

  @IsDecimal({ decimal_digits: '2' })
  @IsOptional()
  monthlyInstallment?: number;  // Angsuran per bulan, bisa dihitung otomatis

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  durationInMonths: number; // Durasi kontrak dalam bulan

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;          // Tanggal mulai kontrak

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;            // Tanggal akhir kontrak
}
