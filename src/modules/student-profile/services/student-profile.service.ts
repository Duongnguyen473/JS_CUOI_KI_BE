import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { StudentProfile } from '../entities/student-profile.entity';
import { StudentProfileRepository } from '../repositories/student-profile.repository';
import { CreateStudentProfileDto } from '../dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from '../dto/update-student-profile.dto';
import { ApiError } from '@Exceptions/api-error';

@Injectable()
export class StudentProfileService extends BaseService<StudentProfile> {
  constructor(private readonly studentProfileRepository: StudentProfileRepository) {
    super(studentProfileRepository);
  }

}
