import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { BaseEntity } from '../interfaces/base-entity.interface';

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

  async getById(id: string): Promise<T | null> {
    return this.repository.getById(id);
  }

  async create(createDto: any): Promise<T> {
    return this.repository.create(createDto);
  }

  async updateOne(id: string, updateDto: any): Promise<T | null> {
    await this.repository.updateOne(updateDto, { where: { id } });
    return this.repository.getById(id);
  }

  async deleteOne(id: string): Promise<boolean> {
    const result = await this.repository.deleteOne({ where: { id } });
    return result > 0;
  }
}
