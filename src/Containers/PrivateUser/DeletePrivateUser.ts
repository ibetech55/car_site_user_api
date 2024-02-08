import { DeletePrivateUserController } from "../../Controllers/PrivateUserControllers/DeletePrivateUserController";
import { DeletePrivateUserUseCase } from "../../Presentation/PrivateUser/DeletePrivateUserUseCase";
import { rabbitMq } from "../../Queue/RabbitMq";
import { PrivateUserRepository } from "../../Repositories/PrivateUser/private.user.repository";
import { UserRepository } from "../../Repositories/User/user.repository";


const privateUserRepository = new PrivateUserRepository();
const userRepository = new UserRepository();
const deletePrivateUserUseCase = new DeletePrivateUserUseCase(
  privateUserRepository,
  userRepository,
  rabbitMq
);
const deletePrivateUserController = new DeletePrivateUserController(
  deletePrivateUserUseCase
);

export { deletePrivateUserController, deletePrivateUserUseCase };
