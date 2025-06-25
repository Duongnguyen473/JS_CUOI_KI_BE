import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@Base/base.repository';
import { StudentProfile } from '../entities/stutent-profile.entity';
import { StudentProfileModel } from '../models/stutent-profile.model';

@Injectable()
export class StudentProfileRepository extends BaseRepository<StudentProfile> {
  constructor() {
    super(StudentProfileModel);
  }
}
