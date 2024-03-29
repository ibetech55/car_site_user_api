import { ChangeUserPasswordController } from "../../../Controllers/UserControllers/ChangePasswordController";
import { ChangeUserPasswordUseCase } from "../../../Presentation/Users/ChangeUserPasswordUseCase";
import { UserRepository } from "../../../Repositories/User/user.repository";
import { GeneratePassword } from "../../../Utils/GeneratePassword";

const userRepository = new UserRepository();
const generatePassword = new GeneratePassword()
const changeUserPasswordUseCase = new ChangeUserPasswordUseCase(userRepository, generatePassword)
const changeUserPasswordController = new ChangeUserPasswordController(changeUserPasswordUseCase)

export {changeUserPasswordUseCase, changeUserPasswordController}