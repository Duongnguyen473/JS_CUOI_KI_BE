import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { BaseEntity } from '../interfaces/base-entity.interface';
import { FindOptions } from 'sequelize';
import { QueryOption } from '../pipe/query-option.interface';
import { PageableDto } from '../dto/pageable.dto';

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  protected repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async getMany(condition?: any): Promise<T[]> {
    return this.repository.getMany(condition);
  }

  async getOne(condition: any): Promise<T | null> {
    return this.repository.getOne(condition);
  }
  async getPage(condition?: FindOptions, options?: QueryOption): Promise<PageableDto<T>> {
    return this.repository.getPage(condition, options);
  }
  async getById(id: string): Promise<T | null> {
    return this.repository.getById(id);
  }

  async create(createDto: any): Promise<T> {
    return this.repository.create(createDto);
  }

  async updateOne(id: string, updateDto: any): Promise<T | null> {
    await this.repository.updateOne(updateDto, { where: { _id: id } });
    return this.repository.getById(id);
  }

  async deleteOne(id: string): Promise<T | null> {
    return this.repository.deleteOne({ where: { _id: id } });
  
  }
}
