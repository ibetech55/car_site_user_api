import { DeleteDealershipController } from "../../../Controllers/DealershipControllers/DeleteDealershipController";
import { DeleteDealershipUseCase } from "../../../Presentation/Dealership/DeleteDealershipUseCase";
import { rabbitMq } from "../../../Queue/RabbitMq";
import { DealershipRepository } from "../../../Repositories/Dealership/dealership.repository";
import { UserRepository } from "../../../Repositories/User/user.repository";

const dealershipRepository = new DealershipRepository();
const userRepository = new UserRepository();
const deleteDealershipUseCase = new DeleteDealershipUseCase(
  dealershipRepository,
  userRepository,
  rabbitMq
);
const deleteDealershipController = new DeleteDealershipController(
  deleteDealershipUseCase
);

export { deleteDealershipController, deleteDealershipUseCase };
