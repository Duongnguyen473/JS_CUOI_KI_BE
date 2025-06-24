import {
  Model,
  ModelCtor,
  FindOptions,
  CreateOptions,
  UpdateOptions,
  DestroyOptions,
} from 'sequelize';
import { Injectable } from '@nestjs/common';
import { QueryOption } from '../pipe/query-option.interface';
import { PageableDto } from '../dto/pageable.dto';

@Injectable()
export abstract class BaseRepository<T extends Model> {
  protected model: ModelCtor<T>;

  constructor(model: ModelCtor<T>) {
    this.model = model;
  }

  async getAll(condition?: FindOptions): Promise<T[]> {
    return this.model.findAll(condition);
  }

  async getPage(condition: FindOptions, options: QueryOption): Promise<PageableDto<unknown>> {
    const { rows: data, count } = await this.model.findAndCountAll(condition);
    return PageableDto.create(options, count, data);
  }

  async getOne(condition: FindOptions): Promise<T | null> {
    return this.model.findOne(condition);
  }

  async getById(id: string): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async create(values: any, condition?: CreateOptions): Promise<T> {
    return this.model.create(values, condition);
  }

  async insertMany(values: any[], condition?: CreateOptions): Promise<T[]> {
    return this.model.bulkCreate(values, condition);
  }

  async updateOne(values: any, condition: UpdateOptions): Promise<[number]> {
    return this.model.update(values, condition);
  }

  async deleteOne(condition: DestroyOptions): Promise<number> {
    return this.model.destroy(condition);
  }

  async deleteMany(condition: DestroyOptions): Promise<number> {
    return this.model.destroy(condition);
  }

  async count(condition?: FindOptions): Promise<number> {
    return this.model.count(condition);
  }

  async exists(condition: FindOptions): Promise<boolean> {
    return await this.model.count(condition) > 0;
  }

  async findAndCountAll(
    condition?: FindOptions,
  ): Promise<{ rows: T[]; count: number }> {
    return this.model.findAndCountAll(condition);
  }
}
