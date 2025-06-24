import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@Base/base.repository';
import { Class } from '../entities/class.entity';

@Injectable()
export class ClassRepository extends BaseRepository<Class> {
  constructor() {
    super(Class);
  }

}
