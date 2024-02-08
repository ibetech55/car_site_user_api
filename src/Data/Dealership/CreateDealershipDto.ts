import { CreateUserDto } from "../User/createUserDto";

export interface CreateDealershipDbDto {
  contact_name: string;
  dealership_name: string;
  dealership_logo: string;
  user_id: string;
}

export interface CreateDealershipDto {
  contactName: string;
  dealershipName: string;
  dealershipLogo: string;
  user: CreateUserDto | string
}

export interface GetCreatedUser {
  id: string;
  email: string;
  userType:string;
  active: boolean;
  accountStatus: string;
}
