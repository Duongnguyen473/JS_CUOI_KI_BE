import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
  constructor(message: string, statusCode: HttpStatus, error?: any) {
    super(
      {
        message,
        error: error || message,
        statusCode,
      },
      statusCode,
    );
  }

  static BadRequest(message: string = 'Bad Request', error?: any) {
    return new ApiError(message, HttpStatus.BAD_REQUEST, error);
  }

  static Unauthorized(message: string = 'Unauthorized', error?: any) {
    return new ApiError(message, HttpStatus.UNAUTHORIZED, error);
  }

  static Forbidden(message: string = 'Forbidden', error?: any) {
    return new ApiError(message, HttpStatus.FORBIDDEN, error);
  }

  static NotFound(message: string = 'Not Found', error?: any) {
    return new ApiError(message, HttpStatus.NOT_FOUND, error);
  }

  static Conflict(message: string = 'Conflict', error?: any) {
    return new ApiError(message, HttpStatus.CONFLICT, error);
  }

  static UnprocessableEntity(
    message: string = 'Unprocessable Entity',
    error?: any,
  ) {
    return new ApiError(message, HttpStatus.UNPROCESSABLE_ENTITY, error);
  }

  static TooManyRequests(message: string = 'Too Many Requests', error?: any) {
    return new ApiError(message, HttpStatus.TOO_MANY_REQUESTS, error);
  }

  static InternalServerError(
    message: string = 'Internal Server Error',
    error?: any,
  ) {
    return new ApiError(message, HttpStatus.INTERNAL_SERVER_ERROR, error);
  }

  static BadGateway(message: string = 'Bad Gateway', error?: any) {
    return new ApiError(message, HttpStatus.BAD_GATEWAY, error);
  }

  static ServiceUnavailable(
    message: string = 'Service Unavailable',
    error?: any,
  ) {
    return new ApiError(message, HttpStatus.SERVICE_UNAVAILABLE, error);
  }

  static GatewayTimeout(message: string = 'Gateway Timeout', error?: any) {
    return new ApiError(message, HttpStatus.GATEWAY_TIMEOUT, error);
  }
}
