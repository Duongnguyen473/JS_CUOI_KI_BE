import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@Base/base.repository';
import { Enrollment } from '../entities/enrollment.entity';
import { EnrollmentModel } from '../models/enrollment.model';
@Injectable()
export class EnrollmentRepository extends BaseRepository<Enrollment> {
  constructor() {
    super(EnrollmentModel);
  }

}
