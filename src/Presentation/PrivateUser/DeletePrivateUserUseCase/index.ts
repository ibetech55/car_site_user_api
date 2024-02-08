import { AppError } from "../../../ErrorHandler/AppError";
import { UpdateAuthUserProviderDto } from "../../../Queue/QueueDtos/UpdateAuthUserProviderDto";
import { RabbitMq } from "../../../Queue/RabbitMq/RabbitMq";
import { USER_API_UPDATE_AUTH_USER } from "../../../Queue/types";
import { IPrivateUserRepository } from "../../../Repositories/PrivateUser/IPrivateUserRepository";
import { IUserRepository } from "../../../Repositories/User/IUserRespository";

export class DeletePrivateUserUseCase {
  private readonly _privateUserRepsoitory: IPrivateUserRepository;
  private readonly _userRepository: IUserRepository;
  private readonly _rabbitMq: RabbitMq;

  constructor(
    privateUserRepsoitory: IPrivateUserRepository,
    userRepository: IUserRepository,
    defaultProvider: RabbitMq
  ) {
    this._privateUserRepsoitory = privateUserRepsoitory;
    this._userRepository = userRepository;
    this._rabbitMq = defaultProvider;
  }

  async execute(id: string) {
    const privateUserData = await this._privateUserRepsoitory.getById(id);
    if (!privateUserData) {
      throw new AppError("User does not exist", 401);
    }
    await this._privateUserRepsoitory.delete(id);
    await this._userRepository.deleteUser(privateUserData.users._id);
    this._rabbitMq.publish<UpdateAuthUserProviderDto>(
      USER_API_UPDATE_AUTH_USER,
      {
        user_id: privateUserData.users._id,
        active: false,
      }
    );
    return true;
  }
}
