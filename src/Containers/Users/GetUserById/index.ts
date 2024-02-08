import { GetUserByIdController } from "../../../Controllers/UserControllers/GetUserByIdController";
import { GetUserMapper } from "../../../Mappers/GetUserMapper";
import { GetUserByIdUseCase } from "../../../Presentation/Users/GetUserByIdUseCase";
import { UserRepository } from "../../../Repositories/User/user.repository";
import { FileHandler } from "../../../Utils/FileHandler";

const userRepository = new UserRepository();
const getUserMapper = new GetUserMapper();
const fileHandler = new FileHandler();
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository, getUserMapper, fileHandler);
const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
export { getUserByIdUseCase, userRepository, getUserByIdController };
