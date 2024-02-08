import { GetUserDto } from "../User/getUserDto";

export interface GetPrivateUserDto {
    id: string;
    firstName: string;
    lastName: string;
    userImage: string;
    dateOfBirth: string;
    user: GetUserDto;
}