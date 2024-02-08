import { GetUserDto } from "../../../Data/User/getUserDto";
import { AppError } from "../../../ErrorHandler/AppError";
import { GetUserMapper } from "../../../Mappers/GetUserMapper";
import { IUserRepository } from "../../../Repositories/User/IUserRespository";
import { FileHandler } from "../../../Utils/FileHandler";

export class GetUserByIdUseCase {
  private _repository: IUserRepository;
  private _mapper: GetUserMapper;
  private _fileHandler: FileHandler;
  constructor(
    repository: IUserRepository,
    mapper: GetUserMapper,
    fileHandler: FileHandler
  ) {
    this._repository = repository;
    this._mapper = mapper;
    this._fileHandler = fileHandler;
  }

  async execute(id: string):Promise<GetUserDto> {
    const data = await this._repository.getUserById(id);
    if(!data) {
      throw new AppError('No user found', 404)
    }
    // let userImageUrl = "";
    // if (data.user_image) {
    //   userImageUrl = await this._fileHandler.getFile(data.user_image);
    // }
    return this._mapper.map({ ...data });
  }
}
