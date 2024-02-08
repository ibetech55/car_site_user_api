import { UpdateUserController } from "../../../Controllers/UpdateUserController";
import { UpdateUserUseCase } from "../../../Presentation/Users/UpdateUserUseCase";
import { DefaultProvider } from "../../../Queue/Providers/DefaultProvider";
import { AddressRepository } from "../../../Repositories/Address/address.repository";
import { UserRepository } from "../../../Repositories/User/user.repository";
import { Queue } from "../../../Queue";

const userRepository = new UserRepository();
const addressRepository = new AddressRepository();
const queue = new Queue();
const defaultProvider = new DefaultProvider(queue);
const updateUserUseCase = new UpdateUserUseCase(
  userRepository,
  addressRepository,
  defaultProvider,
);
const updateUserController = new UpdateUserController(updateUserUseCase);
export { updateUserUseCase, userRepository, updateUserController };
