import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/base/base.repository';
import { User } from '../entities/user.entity';
import { UserModel } from '../models/user.model';
import { ApiError } from '@/common/exceptions/api-error';
import { ReviewModel } from '@/modules/review/models/review.model';
import { ClassModel } from '@/modules/class/models/class.model';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(ReviewModel)
    private readonly reviewModel: typeof ReviewModel,
    @InjectModel(ClassModel)
    private readonly classModel: typeof ClassModel,
  ) {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.getOne({ where: { email } });
  }

  async findActiveUsers(): Promise<User[]> {
    return this.getMany({ where: { isActive: true } });
  }
  // forTutor
  async getTutorAvgRating(tutorId: string): Promise<number> {
    const tutor = await this.getOne({
      where: { _id: tutorId },
    });
    if (!tutor) {
      throw ApiError.NotFound('Tutor not found');
    }
    const tutorClass = await this.classModel.findAll({
      where: { tutor_id: tutorId },
      attributes: ['_id']
    });
    // get all comment from list tutor class _id use sequelize $in
    const review = await this.reviewModel.findAll({
      where: {
        class_id: {
          [Op.in] : tutorClass.map(item => item._id)
        }
      },
      attributes: ['rating']
    });
      
    const totalRating = review.reduce((total, item) => total + item.rating, 0);
    const avgRating = totalRating / review.length;
    return avgRating;
  }
}
