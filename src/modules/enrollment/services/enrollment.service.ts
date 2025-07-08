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
import { EnrollmentStatus, TutorManagerEnrollment } from '../common/constant';
import { UserRepository } from '@/modules/user/repositories/user.repository';

@Injectable()
export class EnrollmentService extends BaseService<Enrollment> {
  constructor(
    private readonly enrollmentRepository: EnrollmentRepository,
    private readonly studentProfileRepository: StudentProfileRepository,
    private readonly classRepository: ClassRepository,
    private readonly userRepository: UserRepository,
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
          attributes: ['_id', 'fullname', 'avatar'],
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
        let student = item.student as UserModel;
        const studentProfile = await this.studentProfileRepository.getOne({
          where: { user_id: item.student._id },
          attributes: ['school', 'grade'],
        });
        let studentInfo: Pick<UserModel, 'phone' | 'email'>
        if (item.status === EnrollmentStatus.STUDYING) {
          studentInfo = await this.userRepository.getInfo(item.student._id);
        }
        item.student = {
          ...student,
          ...studentInfo,
          ...studentProfile
        }

        return {
          ...item,
        };
      }),
    );
    return res;
  }
  async studentCompleteClass(
    studentId: string,
    classId: string,
  ): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.getOne({
      where: { student_id: studentId, class_id: classId },
      attributes: ['status'],
    });
    if (!enrollment) {
      throw ApiError.NotFound('Enrollment not found');
    }
    const completedAt = new Date();
    const res = await this.enrollmentRepository.updateOne(
      { status: EnrollmentStatus.COMPLETED, completed_at: completedAt },
      {
        where: { student_id: studentId, class_id: classId },
      },
    );
    return res;
  }
}
