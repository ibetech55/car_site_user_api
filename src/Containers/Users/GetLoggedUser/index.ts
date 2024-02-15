import { GetLoggedUserController } from "../../../Controllers/UserControllers/GetLoggedUser";
import { GetLoggedUserUseCase } from "../../../Presentation/Users/GetLoggedUserUseCase";
import { UserRepository } from "../../../Repositories/User/user.repository";

const userRepository = new UserRepository();
const getLoggedUserUseCase = new GetLoggedUserUseCase(userRepository);
const getLoggedUserController = new GetLoggedUserController(
  getLoggedUserUseCase
);

export { getLoggedUserUseCase, getLoggedUserController };
