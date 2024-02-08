import { GetDealershipsController } from "../../../Controllers/DealershipControllers/GetDealershipsController ";
import { GetDealershipsUseCase } from "../../../Presentation/Dealership/GetDealershipsUseCase";
import { DealershipRepository } from "../../../Repositories/Dealership/dealership.repository";

const dealershipRepository = new DealershipRepository();
const getDealershipsUseCase = new GetDealershipsUseCase(
  dealershipRepository
);
const getDealershipsController = new GetDealershipsController(
  getDealershipsUseCase
);

export { getDealershipsController, getDealershipsUseCase };
