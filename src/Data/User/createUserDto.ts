import { CreateAddressDto } from "../address/createAddressDto";

export interface CreateUserDto {
  email: string;
  password: string;
  phoneNumber: string;
  address: CreateAddressDto | string;
}

export interface CreateUserDbDto {
  email: string;
  user_type: string;
  active: boolean;
  password: string;
  phone_number: string;
  account_status: string;
  address_id: string;
}
