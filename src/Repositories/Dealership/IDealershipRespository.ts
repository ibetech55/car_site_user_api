import { UpdateDealershipDbDto } from "../../Data/Dealership/UpdateDealershipDto";
import { Dealersrhips } from "../../Entities/dealership";

export interface IDealershipRepository {
  create(values: Dealersrhips): Promise<Dealersrhips>;
  update(id: string, values: UpdateDealershipDbDto): Promise<boolean>;
  getById(id: string): Promise<Dealersrhips>;
  find(): Promise<Dealersrhips[]>;
  delete(id: string): Promise<boolean>;
}
