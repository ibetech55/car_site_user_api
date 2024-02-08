import { UpdateUserDto } from "../User/updateUserDto";
import { UpdateAddressDto } from "../address/UpdateAddressDto";

export interface UpdatePrivateUser {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

export interface UpdatePrivateUserDto {
  privateUser?: UpdatePrivateUser;
  user?: UpdateUserDto;
  address?: UpdateAddressDto;
}

export interface UpdatePrivateUserDbDto {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
}
