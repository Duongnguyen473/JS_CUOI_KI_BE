import { OmitType } from '@nestjs/swagger';
import { Bid } from '../entities/bid.entity';

export class CreateBidDto extends OmitType(Bid, [
  '_id',
  'class_id',
  'student_id',
]) {}
