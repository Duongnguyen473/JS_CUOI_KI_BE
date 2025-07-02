import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { Review } from '../entities/review.entity';
import { ReviewRepository } from '../repositories/review.repository';
import { EnrollmentRepository } from '@/modules/enrollment/repositories/enrollment.repository';
import { ClassRepository } from '@/modules/class/repositories/class.repository';
import { ApiError } from '@/common/exceptions/api-error';
import { UserModel } from '@/modules/user/models/user.model';
import { AuthUser } from '@/common/interfaces/auth-user.interface';
import { CreateReviewDto } from '../dto/create-review.dto';
import { EnrollmentStatus } from '@/modules/enrollment/common/constant';

@Injectable()
export class ReviewService extends BaseService<Review> {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly enrollmentRepository: EnrollmentRepository,
    private readonly classRepository: ClassRepository,
  ) {
    super(reviewRepository);
  }
  async getReviewsOfClass(
    classId: string,
    studentId?: string,
  ): Promise<Review[]> {
    const where: any = { class_id: classId };
    if (studentId) {
      where.reviewer_id = studentId;
    }
    const review = await this.reviewRepository.getMany({
      where,
      attributes: ['rating', 'comment', 'createdAt'],
      include: [
        {
          model: UserModel,
          as: 'reviewer',
          attributes: ['fullname', 'avatar'],
        },
      ],
    });
    return review;
  }

  async studentCreateReviewClass(
    user: AuthUser,
    classId: string,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const enrollment = await this.enrollmentRepository.getOne({
      where: { class_id: classId, student_id: user.id },
      attributes: ['_id', 'status'],
    });
    if (!enrollment) {
      throw ApiError.NotFound('Enrollment not found');
    }
    if (enrollment.status !== EnrollmentStatus.COMPLETED) {
      throw ApiError.BadRequest('Enrollment is not completed');
    }
    
    const review = await this.reviewRepository.exists({
      where: { enrollment_id: enrollment._id, reviewer_id: user.id },
    });
    if (review) {
      throw ApiError.Conflict('You have already review for this class');
    }

    const reviewData = {
      ...createReviewDto,
      class_id: classId,
      enrollment_id: enrollment._id,
      reviewer_id: user.id,
    };
    return this.reviewRepository.create(reviewData);
  }
}
