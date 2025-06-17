import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@Base/base.repository';
import { StudentProfile } from '../entities/student-profile.entity';

@Injectable()
export class StudentProfileRepository extends BaseRepository<StudentProfile> {
  constructor() {
    super(StudentProfile);
  }

}
