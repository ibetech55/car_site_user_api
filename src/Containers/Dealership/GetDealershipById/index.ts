import { GetDealershipByIdController } from "../../../Controllers/DealershipControllers/GetDealershipByIdController";
import { GetDealershipByIdUseCase } from "../../../Presentation/Dealership/GetDealershipByIdUseCase";
import { DealershipRepository } from "../../../Repositories/Dealership/dealership.repository";

const dealershipRepository = new DealershipRepository();
const getDealershipByIdUseCase = new GetDealershipByIdUseCase(
  dealershipRepository
);
const getDealershipByIdController = new GetDealershipByIdController(
  getDealershipByIdUseCase
);

export { getDealershipByIdController, getDealershipByIdUseCase };
