import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ApiError } from '@Exceptions/api-error';
import { StudentProfileRepository } from '../repositories/student-profile.repository';
import { TutorProfileRepository } from '../repositories/tutor-profile.repository';
import { AuthUser } from '@/common/interfaces/auth-user.interface';
import { UserRoles } from '@/modules/user/common/constant';
import { UpdateTutorProfileDto } from '../dto/update-tutor-profile.dto';
import { UpdateStudentProfileDto } from '../dto/update-student-profile.dto';
import { User } from '@/modules/user/entities/user.entity';
import { TutorProfile } from '../entities/tutor-profile.entity';
import { StudentProfile } from '../entities/stutent-profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    private readonly tutorProfileRepository: TutorProfileRepository,
    private readonly studentProfileRepository: StudentProfileRepository,
  ) {}

  async getMeProfile(user: AuthUser): Promise<unknown> {
    if (user.role === UserRoles.STUDENT) {
      return this.getStudentProfile(user.id);
    }
    return this.getTutorProfile(user.id);
  }
  // owner is tutor
  async getTutorProfile(userId: string): Promise<TutorProfile> {
    const profile = await this.tutorProfileRepository.getOne({
      where: { user_id: userId },
    });
    if (!profile) {
      throw ApiError.NotFound('Profile not found');
    }
    return profile;
  }
  async getStudentProfile(userId: string): Promise<StudentProfile> {
    const profile = await this.studentProfileRepository.getOne({
      where: { user_id: userId },
    });
    if (!profile) {
      throw ApiError.NotFound('Profile not found');
    }
    return profile;
  }

  // Owner update profile
  async updateMeProfile(user: AuthUser, updateProfileDto: any): Promise<any> {
    if (user.role === UserRoles.STUDENT) {
      return this.updateStudentProfile(user.id, updateProfileDto);
    }
    return this.updateTutorProfile(user.id, updateProfileDto);
  }

  async updateTutorProfile(
    userId: string,
    updateTutorProfileDto: UpdateTutorProfileDto,
  ): Promise<any> {
    return this.tutorProfileRepository.updateOne(updateTutorProfileDto, {
      where: { user_id: userId },
    });
  }

  async updateStudentProfile(
    userId: string,
    updateStudentProfileDto: UpdateStudentProfileDto,
  ) {
    return this.studentProfileRepository.updateOne(updateStudentProfileDto, {
      where: { user_id: userId },
    });
  }

  async createProfile(
    user: User,
  ): Promise<any> {
    if (user.role === UserRoles.STUDENT) {
      return this.createStudentProfile(user._id);
    }
    return this.createTutorProfile(user._id);
  }

  async createTutorProfile(
    userId: string,
  ): Promise<any> {
    return this.tutorProfileRepository.create({
      user_id: userId,
    });
  }

  async createStudentProfile(
    userId: string,
  ): Promise<any> {
    return this.studentProfileRepository.create({
      user_id: userId,
    });
  }

}
