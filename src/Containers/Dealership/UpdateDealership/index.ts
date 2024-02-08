import { UpdateDealershipController } from "../../../Controllers/DealershipControllers/UpdateDealershipController";
import { UpdateDealershipUseCase } from "../../../Presentation/Dealership/UpdateDealershipUseCase";
import { rabbitMq } from "../../../Queue/RabbitMq";
import { AddressRepository } from "../../../Repositories/Address/address.repository";
import { DealershipRepository } from "../../../Repositories/Dealership/dealership.repository";
import { UserRepository } from "../../../Repositories/User/user.repository";

const dealershipRepository = new DealershipRepository();
const userRepository = new UserRepository();
const addressRepository = new AddressRepository();
const updateDealershipUseCase = new UpdateDealershipUseCase(
  dealershipRepository,
  userRepository,
  addressRepository,
  rabbitMq
);
const updateDealershipController = new UpdateDealershipController(
  updateDealershipUseCase
);

export { updateDealershipUseCase, updateDealershipController };
