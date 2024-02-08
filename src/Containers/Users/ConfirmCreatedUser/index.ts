import { ConfirmCreatedUserController } from "../../../Controllers/UserControllers/ConfirmCreatedUserController";
import { ConfirmCreatedUserUseCase } from "../../../Presentation/Users/ConfirmCreatedUserUseCase";
import { UserRepository } from "../../../Repositories/User/user.repository";
import { HandleToken } from "../../../Utils/HandleToken";

const handleToken = new HandleToken();
const userRepository = new UserRepository();
const confirmCreatedUserUseCase = new ConfirmCreatedUserUseCase(
  handleToken,
  userRepository
);
const confirmCreatedUserController = new ConfirmCreatedUserController(
  confirmCreatedUserUseCase
);
export { confirmCreatedUserController, confirmCreatedUserUseCase };
