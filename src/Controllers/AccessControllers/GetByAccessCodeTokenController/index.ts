import { Request, Response } from "express";
import { GetUserByIdUseCase } from "../../../Presentation/Users/GetUserByIdUseCase";
import { GetByAccessCodeTokenUseCase } from "../../../Presentation/Access/GetByAccessCodeTokenUseCase";

export class GetByAccessCodeTokenController {
  private _getByAccessCodeTokenUseCase: GetByAccessCodeTokenUseCase;
  constructor(getByAccessCodeTokenUseCase: GetByAccessCodeTokenUseCase) {
    this._getByAccessCodeTokenUseCase = getByAccessCodeTokenUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._getByAccessCodeTokenUseCase.execute(request.params.token);
    return response.status(200).json(data);
  }
}
