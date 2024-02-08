export interface UpdateUserDto {
  active?: boolean;
  phoneNumber?: string;
}

export interface UpdateUserDbDto {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  email?: string;
  user_type?: string;
  active?: boolean;
  user_image?: string;
  password?: string;
  phone_number?: string;
  address_id?: string;
  account_status?: string;
}
