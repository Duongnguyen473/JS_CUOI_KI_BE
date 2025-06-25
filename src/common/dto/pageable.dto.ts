import { QueryOption } from '../pipe/query-option.interface';

export class PageableDto<T = any> {
  page: number;
  offset: number;
  limit: number;
  total: number;
  result: T[];

  static create<T>(
    option: QueryOption,
    total: number,
    result: T[],
  ): PageableDto {
    const { page = 1, limit = 10 } = option;
    const offset = option.offset ?? (page - 1) * limit;
    return { page, offset, limit, total, result };
  }
}
