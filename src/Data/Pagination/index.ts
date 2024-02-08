export interface IPagination<T, P> {
    where?: T;
    skip?: number;
    take?: number;
    order?: P;
  }

  export interface GetPaginationDto<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
  }

  export interface IGetData<T> {
    data: T[];
    count: number;
  }