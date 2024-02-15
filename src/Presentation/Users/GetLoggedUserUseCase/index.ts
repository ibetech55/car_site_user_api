import { GetLoggedUserDto } from "../../../Data/User/GetLoggedUserDto";
import { AppError } from "../../../ErrorHandler/AppError";
import { IUserRepository } from "../../../Repositories/User/IUserRespository";

export class GetLoggedUserUseCase {
  private _repository: IUserRepository;
  constructor(repository: IUserRepository) {
    this._repository = repository;
  }

  async execute(id: string): Promise<GetLoggedUserDto> {
    const data = await this._repository.getUserById(id);
    if (!data) {
      throw new AppError("No user found", 404);
    }

    const loggedUser: GetLoggedUserDto = {
      id: data._id,
      active: data.active,
      accountStatus: data.account_status,
      userType: data.user_type
    };
    return loggedUser;
  }
}
