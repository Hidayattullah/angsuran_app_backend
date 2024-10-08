import { PartialType } from '@nestjs/mapped-types';
import { CreatePenaltyDto } from './create-penalty.dto';
import { IsOptional, IsDecimal, IsString } from 'class-validator';

export class UpdatePenaltyDto extends PartialType(CreatePenaltyDto) {
  @IsDecimal({ decimal_digits: '2' }, { message: 'Penalty amount must be a decimal with up to 2 decimal places.' })
  @IsOptional()
  penaltyAmount?: number;  // Jumlah penalti

  @IsString({ message: 'Penalty reason must be a string.' })
  @IsOptional()
  penaltyReason?: string;  // Alasan pemberian penalti
}
