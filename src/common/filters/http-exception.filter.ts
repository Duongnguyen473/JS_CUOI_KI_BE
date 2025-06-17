import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../interfaces/response.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error: string | object = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        error = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        error = exceptionResponse;
      }
    } else if (exception instanceof Error) {
      error = exception.message;
    }

    // Log error for debugging
    this.logger.error(
      `HTTP Status: ${status} Error: ${JSON.stringify(error)}`,
      exception instanceof Error ? exception.stack : 'No stack trace',
    );

    const errorResponse: ApiResponse = {
      success: false,
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      error,
    };

    response.status(status).json(errorResponse);
  }
}
