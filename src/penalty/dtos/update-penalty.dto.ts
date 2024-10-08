// src/contract/dto/update-penalty.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreatePenaltyDto } from './create-penalty.dto';

export class UpdatePenaltyDto extends PartialType(CreatePenaltyDto) {}
