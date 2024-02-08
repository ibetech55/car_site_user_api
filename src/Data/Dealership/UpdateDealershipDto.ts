import { UpdateUserDto } from "../User/updateUserDto";
import { UpdateAddressDto } from "../address/UpdateAddressDto";

export interface UpdateDealership {
  contactName?: string;
  dealershipName?: string;
  dealershioLogo?: string;
}

export interface UpdateDealershipDto {
  dealership?: UpdateDealership;
  user?: UpdateUserDto;
  address?: UpdateAddressDto;
}

export interface UpdateDealershipDbDto {
  contact_name?: string;
  dealership_name?: string;
  dealership_logo?: string;
}
