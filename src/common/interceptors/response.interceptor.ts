import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/response.interface';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        // Handle different response types
        if (data && typeof data === 'object' && 'success' in data) {
          // Already formatted response
          return data;
        }

        // Check if it's a paginated response
        if (data && typeof data === 'object' && 'rows' in data && 'count' in data) {
          const { rows, count } = data;
          const page = parseInt(request.query.page) || 1;
          const limit = parseInt(request.query.limit) || 10;
          
          return {
            success: true,
            statusCode: response.statusCode,
            path: request.url,
            timestamp: new Date().toISOString(),
            data: rows,
            meta: {
              total: count,
              page,
              limit,
              totalPages: Math.ceil(count / limit),
            },
          };
        }

        // Standard success response
        return {
          success: true,
          statusCode: response.statusCode,
          path: request.url,
          timestamp: new Date().toISOString(),
          data,
        };
      }),
    );
  }
}
