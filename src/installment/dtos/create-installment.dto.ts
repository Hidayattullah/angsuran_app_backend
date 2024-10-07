// src/installment/dto/create-installment.dto.ts

import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateInstallmentDto {
  @IsNotEmpty()
  @IsNumber()
  contractId: number;

  @IsNotEmpty()
  @IsNumber()
  installmentNo: number;

  @IsNotEmpty()
  @IsNumber()
  amountPerMonth: number;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;
}
