export interface GetAccessCodeDto {
    _id: string;
    access_code: string;
    access_code_token: string;
    active: boolean;
    type: string;
    user_id: string;
}