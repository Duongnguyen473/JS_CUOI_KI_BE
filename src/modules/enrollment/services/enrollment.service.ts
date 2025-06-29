import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { Enrollment } from '../entities/enrollment.entity';
import { EnrollmentRepository } from '../repositories/enrollment.repository';

@Injectable()
export class EnrollmentService extends BaseService<Enrollment> {
  constructor(private readonly enrollmentRepository: EnrollmentRepository) {
    super(enrollmentRepository);
  }

}
