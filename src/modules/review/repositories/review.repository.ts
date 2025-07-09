import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@Base/base.repository';
import { Review } from '../entities/review.entity';
import { ReviewModel } from '../models/review.model';
@Injectable()
export class ReviewRepository extends BaseRepository<Review> {
  constructor() {
    super(ReviewModel);
  }

}
