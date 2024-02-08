import { CreatePrivateUserController } from "../../Controllers/PrivateUserControllers/CreatePrivateUserController";
import { CreatePrivateUserUseCase } from "../../Presentation/PrivateUser/CreatePrivateUserUseCase";
import { rabbitMq } from "../../Queue/RabbitMq";
import { AccessRepository } from "../../Repositories/Access/access.repository";
import { AddressRepository } from "../../Repositories/Address/address.repository";
import { PrivateUserRepository } from "../../Repositories/PrivateUser/private.user.repository";
import { UserRepository } from "../../Repositories/User/user.repository";
import { FileHandler } from "../../Utils/FileHandler";
import { GenerateImageName } from "../../Utils/GenerateImageName";
import { GeneratePassword } from "../../Utils/GeneratePassword";
import { HandleAccesCode } from "../../Utils/HandleAccesCode";
import { HandleToken } from "../../Utils/HandleToken";

const privateUserRepository = new PrivateUserRepository();
const userRepository = new UserRepository();
const addressRepository = new AddressRepository();
const handleAccessCode = new HandleAccesCode();
const generatePassword = new GeneratePassword();
const fileHandler = new FileHandler();
const generateImageName = new GenerateImageName();
const accessRepository = new AccessRepository();
const handleToken = new HandleToken();
const createPrivateUserUseCase = new CreatePrivateUserUseCase(
  privateUserRepository,
  userRepository,
  addressRepository,
  accessRepository,
  rabbitMq,
  handleAccessCode,
  generatePassword,
  fileHandler,
  generateImageName,
  handleToken
);
const createPrivateUserController = new CreatePrivateUserController(
  createPrivateUserUseCase
);

export { createPrivateUserUseCase, createPrivateUserController };
