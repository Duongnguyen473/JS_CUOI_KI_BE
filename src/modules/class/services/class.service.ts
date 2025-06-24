import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { Class } from '../entities/class.entity';
import { ClassRepository } from '../repositories/class.repository';
import { ApiError } from '@Exceptions/api-error';

@Injectable()
export class ClassService extends BaseService<Class> {
  constructor(private readonly classRepository: ClassRepository) {
    super(classRepository);
  }

}
