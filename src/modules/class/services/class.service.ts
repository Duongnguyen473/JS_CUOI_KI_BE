import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { Class } from '../entities/class.entity';
import { ClassRepository } from '../repositories/class.repository';
import { CreateClassDto } from '../dto/create-class.dto';
import { AuthUser } from '@/common/interfaces/auth-user.interface';
import { ClassStatus, ManagerClass } from '../common/constant';
import { UpdateClassDto } from '../dto/update-class.dto';
import { BidRepository } from '@/modules/bid/repositories/bid.repository';
import { EnrollmentRepository } from '@/modules/enrollment/repositories/enrollment.repository';
import { ApiError } from '@/common/exceptions/api-error';
import { Sequelize } from 'sequelize-typescript';
import { BidStatus } from '@/modules/bid/common/constant';
import { ClassModel } from '../models/class.model';
import { UserRepository } from '@/modules/user/repositories/user.repository';

@Injectable()
export class ClassService extends BaseService<Class> {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly classRepository: ClassRepository,
    private readonly bidRepository: BidRepository,
    private readonly enrollmentRepository: EnrollmentRepository,
    private readonly userRepositroy: UserRepository,
  ) {
    super(classRepository);
  }
  // Student get class
  async getAllClass(): Promise<Class[]> {
    return this.classRepository.getMany();
  }

  async getClassById(id: string): Promise<Class> {
    return this.classRepository.getById(id);
  }

  // Tutor create class
  async createClass(
    user: AuthUser,
    createClassDto: CreateClassDto,
  ): Promise<Class> {
    const classData = {
      ...createClassDto,
      tutor_id: user.id,
    };
    return this.classRepository.create(classData);
  }

  async updateClass(
    tutorId: string,
    id: string,
    updateClassDto: UpdateClassDto,
  ): Promise<Class | null> {
    // TODO: Chỉ cho sửa khi chưa có học viên nào được chọn
    const transaction = await this.sequelize.transaction();
    try {
      const enrollment = await this.enrollmentRepository.exists({
        where: { class_id: id },
        transaction,
      });

      if (enrollment) {
        throw ApiError.BadRequest('Class has enrollment');
      }

      const res = await this.classRepository.updateOne(updateClassDto, {
        where: { _id: id, tutor_id: tutorId },
        transaction,
      });
      if (!res) {
        throw ApiError.BadRequest('Delete bid failed');
      }
      await transaction.commit();
      return res;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  async deleteClass(tutorId: string, id: string): Promise<Class | null> {
    // TODO: Chỉ cho xoá khi chưa có học viên nào được chọn
    const transaction = await this.sequelize.transaction();
    try {
      const enrollment = await this.enrollmentRepository.exists({
        where: { class_id: id },
        transaction,
      });

      if (enrollment) {
        throw ApiError.BadRequest('Class has enrollment');
      }

      const res = await this.classRepository.deleteOne({
        where: { _id: id, tutor_id: tutorId },
        transaction,
      });
      if (!res) {
        throw ApiError.BadRequest('Delete bid failed');
      }
      await transaction.commit();
      return res;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  async closeClass(tutorId: string, id: string): Promise<Class | null> {
    return this.classRepository.updateOne(
      { status: ClassStatus.CLOSED },
      { where: { _id: id, status: ClassStatus.OPEN, tutor_id: tutorId } },
    );
  }
  // Tutor Manager class
  async tutorGetManagerClass(tutorId: string): Promise<ManagerClass[]> {
    const res = await this.classRepository.getMany({
      where: { tutor_id: tutorId },
    });
    const tutorClass = await Promise.all(
      res.map(async (item) => {
        const enrollmentClass = await this.enrollmentRepository.count({
          where: { class_id: item._id },
        });
        const bidClass = await this.bidRepository.getMany({
          where: { class_id: item._id },
        });
        const peddingBid = bidClass.reduce(
          (total, bid) =>
            bid.status === BidStatus.PENDING ? total + 1 : total,
          0,
        );

        return {
          ...item,
          enrollment: enrollmentClass,
          totalBid: bidClass.length,
          peddingBid: peddingBid,
        };
      }),
    );
    return tutorClass;
  }
  async studentGetClass(studentId: string): Promise<Class[]> {
    const bid = await this.bidRepository.getMany({
      where: { student_id: studentId },
      include: [
        {
          model: ClassModel,
          as: 'class',
        }
      ]
    });
    const bidClass = await Promise.all(bid.map(async (item) => {
      const classInfo = item.class as Class;
      const avgRating = await this.userRepositroy.getTutorAvgRating(classInfo.tutor_id);
      
      return item.class;
    }));

    return bidClass;
  }
}
