import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Model } from 'sequelize';

@Injectable()
export abstract class BaseService<T extends Model> {
  protected repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async findAll(options?: any): Promise<T[]> {
    return this.repository.findAll(options);
  }

  async findOne(options: any): Promise<T | null> {
    return this.repository.findOne(options);
  }

  async findById(id: string): Promise<T | null> {
    return this.repository.findById(id);
  }

  async create(createDto: any): Promise<T> {
    return this.repository.create(createDto);
  }

  async update(id: string, updateDto: any): Promise<T | null> {
    await this.repository.update(updateDto, { where: { id } });
    return this.findById(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.repository.delete({ where: { id } });
    return result > 0;
  }
}
