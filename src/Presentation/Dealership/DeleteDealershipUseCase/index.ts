import { AppError } from "../../../ErrorHandler/AppError";
import { UpdateAuthUserProviderDto } from "../../../Queue/QueueDtos/UpdateAuthUserProviderDto";
import { RabbitMq } from "../../../Queue/RabbitMq/RabbitMq";
import { USER_API_UPDATE_AUTH_USER } from "../../../Queue/types";
import { IDealershipRepository } from "../../../Repositories/Dealership/IDealershipRespository";
import { IUserRepository } from "../../../Repositories/User/IUserRespository";

export class DeleteDealershipUseCase {
  private readonly _dealershipRepsoitory: IDealershipRepository;
  private readonly _userRepository: IUserRepository;
  private readonly _rabbitMq: RabbitMq;

  constructor(
    dealershipRepsoitory: IDealershipRepository,
    userRepository: IUserRepository,
    rabbitMq: RabbitMq
  ) {
    this._dealershipRepsoitory = dealershipRepsoitory;
    this._userRepository = userRepository;
    this._rabbitMq = rabbitMq;
  }

  async execute(id: string) {
    const dealershipData = await this._dealershipRepsoitory.getById(id);
    if (!dealershipData) {
      throw new AppError("User does not exist", 401);
    }
    await this._dealershipRepsoitory.delete(id);
    await this._userRepository.deleteUser(dealershipData.users._id);
    this._rabbitMq.publish<UpdateAuthUserProviderDto>(
      USER_API_UPDATE_AUTH_USER,
      {
        user_id: dealershipData.users._id,
        active: false,
      }
    );
    return true;
  }
}
