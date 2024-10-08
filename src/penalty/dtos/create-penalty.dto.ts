import { IsDecimal, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreatePenaltyDto {
  @IsDecimal({ decimal_digits: '2' }, { message: 'Penalty amount must be a decimal with up to 2 decimal places.' })
  @IsNotEmpty({ message: 'Penalty amount is required.' })
  penaltyAmount: number;  // Jumlah penalti

  @IsString({ message: 'Penalty reason must be a string.' })
  @IsNotEmpty({ message: 'Penalty reason is required.' })
  penaltyReason: string;  // Alasan pemberian penalti

  @IsInt({ message: 'Installment ID must be an integer.' })
  @IsNotEmpty({ message: 'Installment ID is required.' })
  installmentId: number;  // ID dari installment terkait
}
