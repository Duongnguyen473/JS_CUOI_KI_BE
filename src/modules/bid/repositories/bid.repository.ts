import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@Base/base.repository';
import { Bid } from '../entities/bid.entity';
import { BidModel } from '../models/bid.model';
@Injectable()
export class BidRepository extends BaseRepository<Bid> {
  constructor() {
    super(BidModel);
  }

}
