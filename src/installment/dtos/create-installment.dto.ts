import { IsNotEmpty, IsNumber, IsDateString, IsDecimal, IsBoolean } from 'class-validator';

export class CreateInstallmentDto {
  @IsNotEmpty()
  @IsNumber()
  installmentNo: number;  // Nomor cicilan

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2', force_decimal: false })
  amountPerMonth: number;  // Jumlah cicilan per bulan (termasuk pokok dan bunga)

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2', force_decimal: false })
  interestRate: number;  // Suku bunga cicilan

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2', force_decimal: false })
  principalAmount: number;  // Jumlah pokok cicilan

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;  // Tanggal jatuh tempo cicilan

  @IsNotEmpty()
  status: string;  // Status cicilan (PENDING, PAID, dll.)

  @IsBoolean()
  isPaidOff: boolean;  // Status apakah sudah lunas
}
