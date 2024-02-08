import { CreateUserDto } from "../User/createUserDto";

export interface CreatePrivateUserDto {
    firstName:string;
    lastName:string;
    dateOfBirth: string;
    userImage: string;
    user: CreateUserDto | string;
}

export interface CreatePrivateUserDbDto {
    first_name:string;
    last_name:string;
    date_of_birth: string;
    user_image: string;
    user_id: string;
}