import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { Class } from '../entities/class.entity';
import { ClassRepository } from '../repositories/class.repository';
import { CreateClassDto } from '../dto/create-class.dto';
import { AuthUser } from '@/common/interfaces/auth-user.interface';
import { ClassStatus } from '../common/constant';
import { UpdateClassDto } from '../dto/update-class.dto';

@Injectable()
export class ClassService extends BaseService<Class> {
  constructor(private readonly classRepository: ClassRepository) {
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

    return this.classRepository.updateOne(updateClassDto, {
      where: { _id: id, tutor_id: tutorId },
    });
  }
  async deleteClass(tutorId: string, id: string): Promise<Class | null> {
    // TODO: Chỉ cho xoá khi chưa có học viên nào được chọn
    return this.classRepository.deleteOne({
      where: { _id: id, tutor_id: tutorId },
    });
  }
  async closeClass(tutorId: string, id: string): Promise<Class | null> {
    return this.classRepository.updateOne(
      { status: ClassStatus.CLOSED },
      { where: { _id: id, status: ClassStatus.OPEN, tutor_id: tutorId } },
    );
  }
}
