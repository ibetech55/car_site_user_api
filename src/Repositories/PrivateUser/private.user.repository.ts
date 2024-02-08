import { Repository } from "typeorm";
import { AppDataSource } from "../../Infra/Database/connection";
import { IPrivateUserRepository } from "./IPrivateUserRepository";
import { PrivateUsers } from "../../Entities/privateUser";
import { CreatePrivateUserDbDto } from "../../Data/PrivateUser/CreatePrivateUserDto";
import { UpdatePrivateUserDbDto } from "../../Data/PrivateUser/UpdatePrivateUserDto";

export class PrivateUserRepository implements IPrivateUserRepository {
  private readonly repository: Repository<PrivateUsers>;

  constructor() {
    this.repository = AppDataSource.getRepository<PrivateUsers>(PrivateUsers);
  }
  async update(id: string, values: UpdatePrivateUserDbDto): Promise<boolean> {
    try {
      await this.repository.update(id, values);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  async find(): Promise<PrivateUsers[]> {
    try {
      const data = await this.repository.find({
        relations: ["users", "users.addresses"],
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id: string): Promise<PrivateUsers> {
    try {
      const data = await this.repository.findOne({
        where: { _id: id },
        relations: ["users", "users.addresses"],
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async create(values: CreatePrivateUserDbDto): Promise<PrivateUsers> {
    try {
      const newPrivateUser = this.repository.create(values);
      const data = await this.repository.save(newPrivateUser);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async delete(id: string): Promise<boolean> {
    await this.repository.softDelete(id);
    return true;
  }
}
