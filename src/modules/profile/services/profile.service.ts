import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ApiError } from '@Exceptions/api-error';
import { StudentProfileRepository } from '../repositories/student-profile.repository';
import { TutorProfileRepository } from '../repositories/tutor-profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly tutorProfileRepository: TutorProfileRepository,
    private readonly studentProfileRepository: StudentProfileRepository,
  ) {}
  
}
