import { GetPrivateUserByIdController } from "../../Controllers/PrivateUserControllers/GetPrivateUserByIdController";
import { GetPrivateUserByIdUseCase } from "../../Presentation/PrivateUser/GetPrivateUserByIdUseCase";
import { PrivateUserRepository } from "../../Repositories/PrivateUser/private.user.repository";

const privateUserRepository = new PrivateUserRepository();
const getPrivateUserByIdUseCase = new GetPrivateUserByIdUseCase(
  privateUserRepository
);
const getPrivateUserByIdController = new GetPrivateUserByIdController(
  getPrivateUserByIdUseCase
);

export { getPrivateUserByIdController, getPrivateUserByIdUseCase };
