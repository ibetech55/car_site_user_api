export interface RegisterAuthUserProviderDto {
    first_name?: string;
    last_name?: string;
    dealership_name?: string;
    email: string;
    active: boolean;
    type: string;
    password: string;
    user_id: string;
    access_code: string;
  }