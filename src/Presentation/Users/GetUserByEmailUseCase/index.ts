import { IUserRepository } from "../../../Repositories/User/IUserRespository";

export class GetUserByEmailUseCase {
  private _repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this._repository = repository;
  }

  async execute(email: string) {
    const data = await this._repository.getUserByEmail(email);
    return data;
  }
}
