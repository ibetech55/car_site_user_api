import { CreateAccessDbDto } from "../../Data/access/createAccessDto";
import { UpdateAccessDbDto } from "../../Data/access/updateAccessDto";
import { Access } from "../../Entities/access";

export interface IAccessRepository {
  create(values: CreateAccessDbDto): Promise<Access>;
  update(id: string, values: UpdateAccessDbDto): Promise<boolean>;
  getAccessData(accessCode: string, accessCodeToken: string): Promise<Access>;
  getByAccessCodeToken(accessCodeToken: string): Promise<Access>;
}
