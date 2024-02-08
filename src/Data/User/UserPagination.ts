import { FindOperator } from "typeorm";

export interface IUserPagination {
  id?: FindOperator<string>;
  firstName?: FindOperator<string>;
  lastName?: FindOperator<string>;
  email?: FindOperator<string>;
  userType?: FindOperator<string>;
  active?: boolean;
  startDate?: FindOperator<string>;
  endDate?: FindOperator<string>;
  city?: FindOperator<string>;
  state?: FindOperator<string>;
  zipCode?: FindOperator<string>;
}

export interface IUserOrderBy {
  first_name?: "asc" | "ASC" | "desc" | "DESC";
  last_name?: "asc" | "ASC" | "desc" | "DESC";
  userType?: "asc" | "ASC" | "desc" | "DESC";
  active?: "asc" | "ASC" | "desc" | "DESC";
  createdAt?: "asc" | "ASC" | "desc" | "DESC";
  addresses?: {
    city: "asc" | "ASC" | "desc" | "DESC";
    state: "asc" | "ASC" | "desc" | "DESC";
    zip_code: "asc" | "ASC" | "desc" | "DESC";
  };
}

export interface ModelPaginationDto {
  modelName?: string;
  makeName?: string;
  active?: boolean;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  orderBy?: {
    modelName?: "asc" | "ASC" | "desc" | "DESC";
    makeName?: "asc" | "ASC" | "desc" | "DESC";
    active?: "asc" | "ASC" | "desc" | "DESC";
    createdAt?: "asc" | "ASC" | "desc" | "DESC";
  };
}
