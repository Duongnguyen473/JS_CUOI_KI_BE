import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@Base/base.repository';
import { TutorProfile } from '../entities/tutor-profile.entity';
import { TutorProfileModel } from '../models/tutor-profile.model';

@Injectable()
export class TutorProfileRepository extends BaseRepository<TutorProfile> {
  constructor() {
    super(TutorProfileModel);
  }
}
