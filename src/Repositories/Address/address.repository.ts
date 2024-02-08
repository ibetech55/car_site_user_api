import { Repository } from "typeorm";
import { AppDataSource } from "../../Infra/Database/connection";
import { IAddressRepository } from "./IAddressRepository";
import { Addresses } from "../../Entities/address";
import { UpdateAddressDbDto } from "../../Data/address/UpdateAddressDto";

export class AddressRepository implements IAddressRepository {
  private readonly repository: Repository<Addresses>;

  constructor() {
    this.repository = AppDataSource.getRepository<Addresses>(Addresses);
  }
  async update(id: string, data: UpdateAddressDbDto): Promise<Boolean> {
    try {
      await this.repository.update(id, data);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  async create(data: Addresses): Promise<Addresses> {
    try {
      const createdAddress = this.repository.create(data);
      const newAddress = await this.repository.save(createdAddress);
      return newAddress;
    } catch (error) {
      console.log(error);
    }
  }
}
