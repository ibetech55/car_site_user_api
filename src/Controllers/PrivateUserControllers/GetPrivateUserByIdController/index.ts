import { Request, Response } from "express";
import { GetPrivateUserByIdUseCase } from "../../../Presentation/PrivateUser/GetPrivateUserByIdUseCase";

export class GetPrivateUserByIdController {
  private readonly _getPrivateUserByIdUseCase: GetPrivateUserByIdUseCase;
  constructor(getPrivateUserByIdUseCase: GetPrivateUserByIdUseCase) {
    this._getPrivateUserByIdUseCase = getPrivateUserByIdUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._getPrivateUserByIdUseCase.execute(
      request.params.id
    );
    return response.status(200).json(data);
  }
}
