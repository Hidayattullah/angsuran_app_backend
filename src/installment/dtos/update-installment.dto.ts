import { PartialType } from '@nestjs/mapped-types';
import { CreateInstallmentDto } from './create-installment.dto';
import { IsBoolean, IsDateString, IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateInstallmentDto extends PartialType(CreateInstallmentDto) {
  @IsOptional()
  @IsNumber()
  installmentNo?: number;  // Nomor cicilan

  @IsOptional()
  @IsDecimal({ decimal_digits: '2', force_decimal: false })
  amountPerMonth?: number;  // Jumlah cicilan per bulan (termasuk pokok dan bunga)

  @IsOptional()
  @IsDecimal({ decimal_digits: '2', force_decimal: false })
  interestRate?: number;  // Suku bunga cicilan

  @IsOptional()
  @IsDecimal({ decimal_digits: '2', force_decimal: false })
  principalAmount?: number;  // Jumlah pokok cicilan

  @IsOptional()
  @IsDateString()
  dueDate?: Date;  // Tanggal jatuh tempo cicilan

  @IsOptional()
  @IsString()
  status?: string;  // Status cicilan (PENDING, PAID, dll.)

  @IsOptional()
  @IsBoolean()
  isPaidOff?: boolean;  // Status apakah sudah lunas
}
