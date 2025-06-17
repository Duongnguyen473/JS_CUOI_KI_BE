import {
  Model,
  ModelCtor,
  FindOptions,
  CreateOptions,
  UpdateOptions,
  DestroyOptions,
} from 'sequelize';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseRepository<T extends Model> {
  protected model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    return this.model.findAll(options);
  }

  async findOne(options: FindOptions): Promise<T | null> {
    return this.model.findOne(options);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async create(values: any, options?: CreateOptions): Promise<T> {
    return this.model.create(values, options);
  }

  async update(values: any, options: UpdateOptions): Promise<[number]> {
    return this.model.update(values, options);
  }

  async delete(options: DestroyOptions): Promise<number> {
    return this.model.destroy(options);
  }

  async count(options?: FindOptions): Promise<number> {
    return this.model.count(options);
  }

  async findAndCountAll(
    options?: FindOptions,
  ): Promise<{ rows: T[]; count: number }> {
    return this.model.findAndCountAll(options);
  }
}
