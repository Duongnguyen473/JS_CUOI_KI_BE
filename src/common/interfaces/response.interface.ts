export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  path: string;
  timestamp: string;
  data?: T;
  error?: string | object;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    [key: string]: any;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
