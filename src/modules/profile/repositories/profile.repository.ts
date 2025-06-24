import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@Base/base.repository';
import { StudentProfile } from '../entities/stutent-profile.entity';

@Injectable()
export class StutentProfileRepository extends BaseRepository<StudentProfile> {
  constructor() {
    super(StudentProfile);
  }
  async getPage(page: number, limit: number) {
    
  }
}
