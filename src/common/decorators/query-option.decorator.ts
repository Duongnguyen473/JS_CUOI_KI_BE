import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { QueryOption } from '../pipe/query-option.interface';
import { parseOrder } from '../utils/parse-order.util';

export const QueryOptionDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): QueryOption => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    const parseNumber = (value: any): number | undefined => {
      const n = parseInt(value, 10);
      return isNaN(n) ? undefined : n;
    };

    return {
      page: parseNumber(query.page),
      limit: parseNumber(query.limit),
      offset: parseNumber(query.offset),
      order: parseOrder(query.order),
    };
  },
);
