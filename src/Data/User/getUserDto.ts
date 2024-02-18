import { GetDealershipDto } from "../Dealership/GetDealershipDto";
import { GetPrivateUserDto } from "../PrivateUser/GetPrivateUserDto";
import { GetAddressDto } from "../address/GetAddressDto";

export interface GetUserDto {
  id: string;
  email: string;
  active: boolean;
  createdAt: string | Date;
  address: GetAddressDto;
  phoneNumber: string;
  userType: string;
  privateUser?: Omit<GetPrivateUserDto, 'user'>
  dealership?: Omit<GetDealershipDto, 'user'>
}

export interface IGetUser {
  _id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  user_type: string;
  active: boolean;
  user_image: string;
}
