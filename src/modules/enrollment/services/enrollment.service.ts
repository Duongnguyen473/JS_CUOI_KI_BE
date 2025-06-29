import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { Enrollment } from '../entities/enrollment.entity';
import { EnrollmentRepository } from '../repositories/enrollment.repository';
import { ApiError } from '@/common/exceptions/api-error';
import { UserModel } from '@/modules/user/models/user.model';
import { BidModel } from '@/modules/bid/models/bid.model';
import { StudentProfile } from '@/modules/profile/entities/stutent-profile.entity';
import e from 'express';
import { StudentProfileRepository } from '@/modules/profile/repositories/student-profile.repository';
import { ClassRepository } from '@/modules/class/repositories/class.repository';
import { TutorManagerEnrollment } from '../common/constant';

@Injectable()
export class EnrollmentService extends BaseService<Enrollment> {
  constructor(
    private readonly enrollmentRepository: EnrollmentRepository,
    private readonly studentProfileRepository: StudentProfileRepository,
    private readonly classRepository: ClassRepository,
  ) {
    super(enrollmentRepository);
  }
  async tutorGetEnrollmentsOfClass(
    tutorId: string,
    classId: string,
  ): Promise<TutorManagerEnrollment[]> {
    const enrollmentClass = await this.classRepository.exists({
      where: { _id: classId, tutor_id: tutorId },
    });
    if (!enrollmentClass) {
      throw ApiError.NotFound('Class not found');
    }
    const enrollment = await this.enrollmentRepository.getMany({
      where: { class_id: classId },
      include: [
        {
          model: UserModel,
          as: 'student',
          attributes: ['_id', 'fullname', 'email', 'phone', 'avatar'],
        },
        {
          model: BidModel,
          as: 'bid',
          attributes: ['_id', 'bid_price', 'message', 'address'],
        },
      ],
    });
    if (!enrollment) {
      throw ApiError.NotFound('Enrollment not found');
    }
    const res = await Promise.all(
      enrollment.map(async (item) => {
        const studentProfile = await this.studentProfileRepository.getOne({
          where: { user_id: item.student._id },
          attributes: ['school', 'grade']
        });

        return {
          ...item,
          student_profile: studentProfile,
        };
      }),
    );
    return res;
  }
}
