import { CreatePrivateUserDbDto } from "../../Data/PrivateUser/CreatePrivateUserDto";
import { UpdatePrivateUserDbDto } from "../../Data/PrivateUser/UpdatePrivateUserDto";
import { PrivateUsers } from "../../Entities/privateUser";

export interface IPrivateUserRepository {
  create(values: CreatePrivateUserDbDto): Promise<PrivateUsers>;
  getById(id: string): Promise<PrivateUsers>;
  find(): Promise<PrivateUsers[]>;
  update(id: string, values:UpdatePrivateUserDbDto): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
