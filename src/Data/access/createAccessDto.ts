export interface CreateAccessDbDto {
    access_code: string;
    access_code_token: string;
    active: boolean;
    type: string;
    user_id: string;
}