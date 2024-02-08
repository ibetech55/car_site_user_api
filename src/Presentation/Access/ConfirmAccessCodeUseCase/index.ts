import { ACCOUNT_ACTIVATED } from "../../../Configs/Constants/AccountStatus";
import { AppError } from "../../../ErrorHandler/AppError";
import { UpdateAuthUserProviderDto } from "../../../Queue/QueueDtos/UpdateAuthUserProviderDto";
import { RabbitMq } from "../../../Queue/RabbitMq/RabbitMq";
import { USER_API_UPDATE_AUTH_USER } from "../../../Queue/types";
import { AccessRepository } from "../../../Repositories/Access/access.repository";
import { IUserRepository } from "../../../Repositories/User/IUserRespository";
import { HandleAccesCode } from "../../../Utils/HandleAccesCode";

export class ConfirmAccessCodeUseCase {
  private readonly _repository: IUserRepository;
  private readonly _accessRepository: AccessRepository;
  private readonly _rabbitMq: RabbitMq;
  private readonly _generateAccessCode: HandleAccesCode;

  constructor(
    repository: IUserRepository,
    accessRepository: AccessRepository,
    rabbitMq: RabbitMq,
    generateAccessCode: HandleAccesCode
  ) {
    this._repository = repository;
    this._generateAccessCode = generateAccessCode;
    this._accessRepository = accessRepository;
    this._rabbitMq = rabbitMq;
  }

  async execute(
    id: string,
    accessCode: string,
    accessCodeToken: string
  ): Promise<Boolean> {
    const userTokenData =
      this._generateAccessCode.decodeAccessToken(accessCodeToken);
    const userData = await this._repository.getUserById(id);
    const accessData = await this._accessRepository.getAccessData(
      accessCode,
      accessCodeToken
    );
    
    if (!userData || !accessData) {
      throw new AppError("Incorrect access code, please try again", 400);
    }
    if (accessData.access_code_token !== accessCodeToken) {
      throw new AppError("Bad Request", 400);
    }

    if (userTokenData.userId !== userData._id && accessData.user_id) {
      throw new AppError("Bad Request", 400);
    }

    if (accessData.access_code !== accessCode) {
      throw new AppError("Incorrect access code, please try again", 400);
    }

    await this._repository.updateUser(id, {
      active: true,
      account_status: ACCOUNT_ACTIVATED,
    });
    await this._accessRepository.update(accessData._id, { active: false });

    this._rabbitMq.publish<UpdateAuthUserProviderDto>(
      USER_API_UPDATE_AUTH_USER,
      {
        user_id: userData._id,
        active: true,
      }
    );
    return true;
  }
}
