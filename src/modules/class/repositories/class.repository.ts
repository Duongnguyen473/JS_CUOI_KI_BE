import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@Base/base.repository';
import { Class } from '../entities/class.entity';
import { ClassModel } from '../models/class.model';

@Injectable()
export class ClassRepository extends BaseRepository<Class> {
  constructor() {
    super(ClassModel);
  }

}
