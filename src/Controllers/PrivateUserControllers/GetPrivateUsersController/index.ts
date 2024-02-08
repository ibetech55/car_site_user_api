import { Request, Response } from "express";
import { GetPrivateUsersUseCase } from "../../../Presentation/PrivateUser/GetPrivateUsersUseCase";

export class GetPrivateUsersController {
  private readonly _getPrivateUsersUseCase: GetPrivateUsersUseCase;
  constructor(getPrivateUsersUseCase: GetPrivateUsersUseCase) {
    this._getPrivateUsersUseCase = getPrivateUsersUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._getPrivateUsersUseCase.execute();
    return response.status(200).json(data);
  }
}
