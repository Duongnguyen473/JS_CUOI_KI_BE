import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'sequelize';

@Injectable()
export abstract class BaseService<T extends Model> {
  protected repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async getAll(condition?: any): Promise<T[]> {
    return this.repository.getAll(condition);
  }

  async getOne(condition: any): Promise<T | null> {
    return this.repository.getOne(condition);
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.getById(id);
  }

  async create(createDto: any): Promise<T> {
    return this.repository.create(createDto);
  }

  async updateOne(id: string, updateDto: any): Promise<T | null> {
    await this.repository.updateOne(updateDto, { where: { id } });
    return this.findById(id);
  }

  async deleteOne(id: string): Promise<boolean> {
    const result = await this.repository.deleteOne({ where: { id } });
    return result > 0;
  }
}
