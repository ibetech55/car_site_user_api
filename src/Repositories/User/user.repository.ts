import { Repository } from "typeorm";
import { Users } from "../../Entities/user";
import { IUserRepository } from "./IUserRespository";
import { AppDataSource } from "../../Infra/Database/connection";
import { CreateUserDbDto } from "../../Data/User/createUserDto";
import { UpdateUserDbDto } from "../../Data/User/updateUserDto";

export class UserRepository implements IUserRepository {
  private readonly repository: Repository<Users>;

  constructor() {
    this.repository = AppDataSource.getRepository<Users>(Users);
  }
  async deleteUser(id: string): Promise<boolean> {
    try {
      await this.repository.update(id, { active: false });
      await this.repository.softDelete(id);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  async getUserByEmail(email: string): Promise<Users> {
    try {
      const userData = await this.repository.findOneBy({ email });

      return userData;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserById(id: string): Promise<Users> {
    try {
      const userData = await this.repository.findOne({
        where: { _id: id },
        relations: ["addresses", "dealerships", "privateUsers", "access"],
        select:{access:{_id:true, access_code:true, access_code_token:true}}
      });
      return userData;
    } catch (error) {
      console.log(error);
    }
  }

  async find(): Promise<Users[]> {
    try {
      const usersData = await this.repository.find({
        relations: ["addresses"],
      });
      return usersData;
    } catch (error) {
      console.log("error");
    }
  }

  async create(data: CreateUserDbDto): Promise<Users> {
    try {
      const createdUser = this.repository.create(data);
      const newUser = await this.repository.save(createdUser);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(id: string, values: UpdateUserDbDto): Promise<boolean> {
    try {
      await this.repository.update(id, values);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
