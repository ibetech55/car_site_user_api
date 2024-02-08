export interface UpdateAddressDto {
  state: string;
  city: string;
  street: string;
  zipCode: string;
}

export interface UpdateAddressDbDto {
  state?: string;
  city?: string;
  street?: string;
  zip_code?: string;
}
