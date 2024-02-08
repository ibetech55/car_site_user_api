import { Repository } from "typeorm";
import { AppDataSource } from "../../Infra/Database/connection";
import { IAccessRepository } from "./IAccessRepository";
import { Access } from "../../Entities/access";
import { UpdateAccessDbDto } from "../../Data/access/updateAccessDto";

export class AccessRepository implements IAccessRepository {
  private readonly repository: Repository<Access>;

  constructor() {
    this.repository = AppDataSource.getRepository<Access>(Access);
  }
  async getByAccessCodeToken(accessCodeToken: string): Promise<Access> {
    try {
      const data = await this.repository.findOne({
        where: { access_code_token: accessCodeToken },
        relations: ["users"],
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async update(id: string, values: UpdateAccessDbDto): Promise<boolean> {
    try {
      const data = await this.repository.update(id, values);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  async getAccessData(
    accessCode: string,
    accessCodeToken: string
  ): Promise<Access> {
    try {
      const data = await this.repository.findOne({
        where: { access_code_token: accessCodeToken, access_code: accessCode },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async create(data: Access): Promise<Access> {
    try {
      const createdAccess = this.repository.create(data);
      const newAccess = await this.repository.save(createdAccess);
      return newAccess;
    } catch (error) {
      console.log(error);
    }
  }
}
