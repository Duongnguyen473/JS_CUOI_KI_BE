import {
  Model,
  ModelCtor,
  FindOptions,
  CreateOptions,
  UpdateOptions,
  BulkCreateOptions,
  DestroyOptions,
} from 'sequelize';
import { Injectable } from '@nestjs/common';
import { QueryOption } from '../pipe/query-option.interface';
import { PageableDto } from '../dto/pageable.dto';
import { BaseEntity } from '../interfaces/base-entity.interface';

@Injectable()
export abstract class BaseRepository<E extends BaseEntity> {
  constructor(private readonly model: ModelCtor<Model<E>>) {}

  async getAll(condition?: FindOptions): Promise<E[]> {
    const res = await this.model.findAll(condition);
    return res.map((item) => item.toJSON());
  }

  async getPage(
    condition: FindOptions,
    options: QueryOption,
  ): Promise<PageableDto<unknown>> {
    const { rows: data, count } = await this.model.findAndCountAll(condition);
    return PageableDto.create(options, count, data);
  }

  async getOne(condition: FindOptions): Promise<E | null> {
    const res = await this.model.findOne(condition);
    return res?.toJSON() || null;
  }

  async getById(id: string): Promise<E | null> {
    const res = await this.model.findByPk(id);
    return res?.toJSON() || null;
  }

  async create(values: any, condition?: CreateOptions): Promise<E> {
    const res = await this.model.create(values, condition);
    return res?.toJSON() || null;
  }

  async insertMany(
    values: any[],
    condition?: BulkCreateOptions<E>,
  ): Promise<E[]> {
    const res = await this.model.bulkCreate(values, condition);
    return res.map((item) => item.toJSON());
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
    return (await this.model.count(condition)) > 0;
  }

  async findAndCountAll(
    condition?: FindOptions,
  ): Promise<{ rows: E[]; count: number }> {
    const res = await this.model.findAndCountAll(condition);
    return { rows: res.rows.map((item) => item.toJSON()), count: res.count };
  }
}
