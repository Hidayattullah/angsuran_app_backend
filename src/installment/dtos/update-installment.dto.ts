// src/contract/dto/update-installment.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateInstallmentDto } from './create-installment.dto';

export class UpdateInstallmentDto extends PartialType(CreateInstallmentDto) {}
