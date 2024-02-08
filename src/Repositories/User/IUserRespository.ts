import { CreateUserDbDto } from "../../Data/User/createUserDto";
import { UpdateUserDbDto } from "../../Data/User/updateUserDto";
import { Users } from "../../Entities/user";

export interface IUserRepository {
  create(data: CreateUserDbDto): Promise<Users>;
  find(): Promise<Users[]>;
  getUserByEmail(email: string): Promise<Users>;
  getUserById(id: string): Promise<Users>;
  deleteUser(id: string): Promise<boolean>;
  updateUser(id: string, data: UpdateUserDbDto): Promise<boolean>;
}
