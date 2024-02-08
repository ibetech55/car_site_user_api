import { ACCOUNT_CREATED } from "../../../Configs/Constants/AccountStatus";
import { CREATED_USER_SECRET_KEY } from "../../../Configs/Enviroment/EnviromentVariables";
import { CreatedUserDto } from "../../../Data/User/CreatedUserDto";
import { AppError } from "../../../ErrorHandler/AppError";
import { UserRepository } from "../../../Repositories/User/user.repository";
import { HandleToken } from "../../../Utils/HandleToken";

export class ConfirmCreatedUserUseCase {
  private readonly _handleToken: HandleToken;
  private readonly _userRepository: UserRepository;

  constructor(handleToken: HandleToken, userRepository: UserRepository) {
    this._handleToken = handleToken;
    this._userRepository = userRepository;
  }

  async execute(token: string): Promise<boolean> {
    const data = this._handleToken.verifyToken<CreatedUserDto>(
      token,
      CREATED_USER_SECRET_KEY
    );
    if (!data) {
      throw new AppError("Bad Request", 400);
    }
    const userData = await this._userRepository.getUserById(data.id);

    if (
      userData._id !== data.id ||
      data.active === true || 
      data.accountStatus !== ACCOUNT_CREATED
    ) {
      throw new AppError("Bad Request", 400);
    }

    return true;
  }
}
