import { UpdateAddressDbDto } from "../../Data/address/UpdateAddressDto";
import { CreateAddressDbDto } from "../../Data/address/createAddressDto";
import { Addresses } from "../../Entities/address";

export interface IAddressRepository {
  create(data: CreateAddressDbDto): Promise<Addresses>;
  update(id: string, data: UpdateAddressDbDto): Promise<Boolean>;
}
