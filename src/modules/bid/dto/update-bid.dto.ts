import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/swagger';
import { Bid } from '../entities/bid.entity';

export class UpdateBidDto extends PartialType(
  OmitType(Bid, ['_id', 'class_id', 'student_id', 'status']),
) {}
