export interface UpdateAuthUserProviderDto {
    user_id: string;
    dealership_name?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    active?: boolean;
    phone_number?: string;
}