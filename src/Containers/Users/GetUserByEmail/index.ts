import { GetUserByEmailController } from "../../../Controllers/UserControllers/GetUserByEmailController";
import { GetUserByEmailUseCase } from "../../../Presentation/Users/GetUserByEmailUseCase";
import { UserRepository } from "../../../Repositories/User/user.repository";

const userRepository = new UserRepository();
const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);
const getUserByEmailController = new GetUserByEmailController(
  getUserByEmailUseCase
);
export { getUserByEmailUseCase, userRepository, getUserByEmailController };
