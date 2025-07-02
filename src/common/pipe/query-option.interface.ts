export interface QueryOption {
    page?: number;
    limit?: number;
    offset?: number;
    // select?: { [field: string]: 0 | 1 };
    order?: [string, 'ASC' | 'DESC'][];
}
