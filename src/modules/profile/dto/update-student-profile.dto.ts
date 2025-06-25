import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/swagger';
import { StudentProfile } from '../entities/stutent-profile.entity';

export class UpdateStudentProfileDto extends PartialType(
  OmitType(StudentProfile, ['_id', 'user_id']),
) {}
