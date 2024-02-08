export interface AccessCodeProviderPrivateUserDto {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    access_code: string;
    access_code_token: string;
}

export interface AccessCodeProviderDealershipDto {
    user_id: string;
    dealership_name: string;
    email: string;
    access_code: string;
    access_code_token: string;
}

