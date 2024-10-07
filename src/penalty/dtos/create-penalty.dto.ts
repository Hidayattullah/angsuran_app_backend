// src/penalty/dtos/create-penalty.dto.ts

import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePenaltyDto {
  @IsNumber()
  @IsNotEmpty()
  installmentId: number;

  @IsDecimal()
  @IsNotEmpty()
  penaltyAmount: number;

  @IsString()
  @IsNotEmpty()
  penaltyReason: string;
}
