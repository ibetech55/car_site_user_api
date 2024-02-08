import { GetAllUsersController } from "../../../Controllers/UserControllers/GetAllUserController";
import { GetUserMapper } from "../../../Mappers/GetUserMapper";
import { GetAllUsersUseCase } from "../../../Presentation/Users/GetAllUsersUseCase";
import { UserRepository } from "../../../Repositories/User/user.repository";

const userRepository = new UserRepository();
const getUserMapper = new GetUserMapper();
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository, getUserMapper);
const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);
export { getAllUsersUseCase, userRepository, getAllUsersController };
