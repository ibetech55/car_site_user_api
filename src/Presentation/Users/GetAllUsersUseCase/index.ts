import { GetUserDto } from "../../../Data/user/getUserDto";
import { Users } from "../../../Entities/user";
import { GetUserMapper } from "../../../Mappers/GetUserMapper";
import { IUserRepository } from "../../../Repositories/User/IUserRespository";

export class GetAllUsersUseCase {
  private _repository: IUserRepository;
  private _mapper: GetUserMapper;

  constructor(repository: IUserRepository, mapper: GetUserMapper) {
    this._repository = repository;
    this._mapper = mapper;
  }

  async execute(): Promise<GetUserDto[]> {
    const data: Users[] = await this._repository.find();
    return data.map((x: Users) => this._mapper.map(x));
  }
}
