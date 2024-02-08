import { AppError } from "../../../ErrorHandler/AppError";
import { IUserRepository } from "../../../Repositories/User/IUserRespository";
import { GeneratePassword } from "../../../Utils/GeneratePassword";

export class ChangeUserPasswordUseCase {
  private _repository: IUserRepository;
  private _generatePassword:GeneratePassword;

  constructor(repository: IUserRepository, generatePassword:GeneratePassword) {
    this._repository = repository;
    this._generatePassword = generatePassword;
  }

  async execute(id: string, oldPassword:string, newPassword: string): Promise<Boolean> {
    const userData = await this._repository.getUserById(id);
    if (!userData) {
      throw new AppError("No user found", 404);
    }

    const passwordDecoded = this._generatePassword.decryptPassword(oldPassword, userData.password)
    if (!passwordDecoded) {
      throw new AppError("Incorrect password, please try again", 400);
    }

    const passwordEncoded = this._generatePassword.encryptPassword(newPassword)

    const data = await this._repository.updateUser(id, { password: passwordEncoded });
    return data;
  }
}
