export interface CreateAddressDto {
    state: string;
    city: string;
    street: string;
    zipCode: string;
  }
  
  export interface CreateAddressDbDto {
    city: string;
    state: string;
    street: string;
    zip_code: string;
    longitude: number;
    latitude: number;
  }