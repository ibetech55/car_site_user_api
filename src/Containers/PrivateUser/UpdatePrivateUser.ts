import { UpdatePrivateUserController } from "../../Controllers/PrivateUserControllers/UpdatePrivateUserController";
import { UpdatePrivateUserUseCase } from "../../Presentation/PrivateUser/UpdatePrivateUserUseCase";
import { rabbitMq } from "../../Queue/RabbitMq";
import { AddressRepository } from "../../Repositories/Address/address.repository";
import { PrivateUserRepository } from "../../Repositories/PrivateUser/private.user.repository";
import { UserRepository } from "../../Repositories/User/user.repository";

const privateUserRepository = new PrivateUserRepository();
const userRepository = new UserRepository();
const addressRepository = new AddressRepository();
const updatePrivateUserUseCase = new UpdatePrivateUserUseCase(
  privateUserRepository,
  userRepository,
  addressRepository,
  rabbitMq
);
const updatePrivateUserController = new UpdatePrivateUserController(
  updatePrivateUserUseCase
);

export { updatePrivateUserUseCase, updatePrivateUserController };
