import { Repository } from "typeorm";
import { AppDataSource } from "../../Infra/Database/connection";
import { IDealershipRepository } from "./IDealershipRespository";
import { CreateDealershipDbDto } from "../../Data/Dealership/CreateDealershipDto";
import { Dealersrhips } from "../../Entities/dealership";
import { UpdateDealershipDbDto } from "../../Data/Dealership/UpdateDealershipDto";
import { Users } from "../../Entities/user";

export class DealershipRepository implements IDealershipRepository {
  private readonly repository: Repository<Dealersrhips>;

  constructor() {
    this.repository = AppDataSource.getRepository<Dealersrhips>(Dealersrhips);
  }
  async delete(id: string): Promise<boolean> {
    await this.repository.softDelete(id);
    return true;
  }
  async find(): Promise<Dealersrhips[]> {
    const data = await this.repository.find({relations:['users', 'users.addresses']});
    return data;
  }
  async getById(id: string): Promise<Dealersrhips> {
    const data = await this.repository.findOne({
      where: { _id: id },
      relations: ["users", "users.addresses"]
    });
    return data;
  }
  async update(id: string, values: UpdateDealershipDbDto): Promise<boolean> {
    await this.repository.update(id, values);
    return true;
  }
  async create(values: Dealersrhips): Promise<Dealersrhips> {
    const newDealership = this.repository.create(values);
    const data = await this.repository.save(newDealership);
    return data;
  }
}
