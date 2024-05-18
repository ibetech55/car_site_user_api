import { CreateDealershipController } from "../../../Controllers/DealershipControllers/CreateDealershipController";
import { CreateDealershipUseCase } from "../../../Presentation/Dealership/CreateDealershipUseCase";
import { rabbitMq } from "../../../Queue/RabbitMq";
import { AccessRepository } from "../../../Repositories/Access/access.repository";
import { AddressRepository } from "../../../Repositories/Address/address.repository";
import { DealershipRepository } from "../../../Repositories/Dealership/dealership.repository";
import { UserRepository } from "../../../Repositories/User/user.repository";
import { FileHandler } from "../../../Utils/FileHandler";
import { GenerateImageName } from "../../../Utils/GenerateImageName";
import { GeneratePassword } from "../../../Utils/GeneratePassword";
import { GetLonLatByZipCode } from "../../../Utils/GetLatLonByZipCode";
import { HandleAccesCode } from "../../../Utils/HandleAccesCode";
import { HandleToken } from "../../../Utils/HandleToken";

const dealershipRepository = new DealershipRepository();
const userRepository = new UserRepository();
const addressRepository = new AddressRepository();
const handleAccessCode = new HandleAccesCode();
const generatePassword = new GeneratePassword();
const fileHandler = new FileHandler();
const generateImageName = new GenerateImageName();
const accessRepository = new AccessRepository();
const handleToken = new HandleToken();
const getLatLonByZipCode = new GetLonLatByZipCode();
const createDealershipUseCase = new CreateDealershipUseCase(
  dealershipRepository,
  userRepository,
  addressRepository,
  accessRepository,
  rabbitMq,
  handleAccessCode,
  generatePassword,
  fileHandler,
  generateImageName,
  handleToken,
  getLatLonByZipCode
);
const createDealershipController = new CreateDealershipController(
  createDealershipUseCase
);

export { createDealershipUseCase, createDealershipController };
