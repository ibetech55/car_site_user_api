import { GetPrivateUsersController } from "../../Controllers/PrivateUserControllers/GetPrivateUsersController";
import { GetPrivateUsersUseCase } from "../../Presentation/PrivateUser/GetPrivateUsersUseCase";
import { PrivateUserRepository } from "../../Repositories/PrivateUser/private.user.repository";

const privateUserRepository = new PrivateUserRepository();
const getPrivateUsersUseCase = new GetPrivateUsersUseCase(
  privateUserRepository
);
const getPrivateUsersController = new GetPrivateUsersController(
  getPrivateUsersUseCase
);

export { getPrivateUsersController, getPrivateUsersUseCase };
