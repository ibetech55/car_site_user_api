import { ACCOUNT_CREATED } from "../../../Configs/Constants/AccountStatus";
import { ACCESS_CODE_SECRET_KEY } from "../../../Configs/Enviroment/EnviromentVariables";
import { AppError } from "../../../ErrorHandler/AppError";
import { AccessRepository } from "../../../Repositories/Access/access.repository";
import { HandleToken } from "../../../Utils/HandleToken";

export class GetByAccessCodeTokenUseCase {
  private readonly _accessRepository: AccessRepository;
  private readonly _handleToken: HandleToken;

  constructor(accessRepository: AccessRepository, handleToken: HandleToken) {
    this._accessRepository = accessRepository;
    this._handleToken = handleToken;
  }

  async execute(accessCodeToken: string) {
    if (!accessCodeToken) {
      throw new AppError("Bad Request", 400);
    }

    const accessData = await this._accessRepository.getByAccessCodeToken(
      accessCodeToken
    );
    if (!accessData) {
      throw new AppError("Bad Request", 401);
    }

    if (accessData.users.account_status !== ACCOUNT_CREATED) {
      throw new AppError("Bad Request", 402);
    }

    const tokenData = this._handleToken.verifyToken<{ userId: string }>(
      accessCodeToken,
      ACCESS_CODE_SECRET_KEY
    );
    if (!tokenData) {
      throw new AppError("Bad Request", 403);
    }
    if (accessData.users._id !== tokenData.userId) {
      throw new AppError("Bad Request", 404);
    }

    return {
      userId: accessData.users._id,
      accountStatus: accessData.users.account_status,
    };
  }
}
