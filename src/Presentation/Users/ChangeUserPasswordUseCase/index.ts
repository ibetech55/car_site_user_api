import { AppError } from "../../../ErrorHandler/AppError";
import { UpdateAuthUserProviderDto } from "../../../Queue/QueueDtos/UpdateAuthUserProviderDto";
import { RabbitMq } from "../../../Queue/RabbitMq/RabbitMq";
import { USER_API_UPDATE_AUTH_USER } from "../../../Queue/types";
import { IUserRepository } from "../../../Repositories/User/IUserRespository";
import { GeneratePassword } from "../../../Utils/GeneratePassword";

export class ChangeUserPasswordUseCase {
  private readonly _repository: IUserRepository;
  private readonly _generatePassword: GeneratePassword;
  private readonly _rabbitMq: RabbitMq;

  constructor(repository: IUserRepository, generatePassword: GeneratePassword, rabbitMq: RabbitMq) {
    this._repository = repository;
    this._generatePassword = generatePassword;
    this._rabbitMq = rabbitMq;
  }

  async execute(
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<Boolean> {
    const userData = await this._repository.getUserById(id);
    if (!userData) {
      throw new AppError("No user found", 404);
    }

    const passwordDecoded = this._generatePassword.decryptPassword(
      oldPassword,
      userData.password
    );
    if (!passwordDecoded) {
      throw new AppError("Incorrect password, please try again", 400);
    }

    const passwordEncoded = this._generatePassword.encryptPassword(newPassword);

    const data = await this._repository.updateUser(id, {
      password: passwordEncoded,
    });
    const userDataUpdated = await this._repository.getUserById(id);

    this._rabbitMq.publish<UpdateAuthUserProviderDto>(
      USER_API_UPDATE_AUTH_USER,
      {
        user_id: userDataUpdated._id,
        password: userDataUpdated.password,
      }
    );
    return data;
  }
}
