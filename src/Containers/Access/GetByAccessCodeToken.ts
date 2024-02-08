import { GetByAccessCodeTokenController } from "../../Controllers/AccessControllers/GetByAccessCodeTokenController";
import { GetByAccessCodeTokenUseCase } from "../../Presentation/Access/GetByAccessCodeTokenUseCase";
import { AccessRepository } from "../../Repositories/Access/access.repository";
import { HandleToken } from "../../Utils/HandleToken";

const accessRepository = new AccessRepository();
const handleToken = new HandleToken();
const getByAccessCodeTokenUseCase = new GetByAccessCodeTokenUseCase(
  accessRepository,
  handleToken
);
const getByAccessCodeTokenController = new GetByAccessCodeTokenController(
  getByAccessCodeTokenUseCase
);
export { getByAccessCodeTokenController, getByAccessCodeTokenUseCase };
