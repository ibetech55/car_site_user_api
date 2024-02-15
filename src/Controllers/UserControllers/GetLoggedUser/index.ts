import { Request, Response } from "express";
import { GetLoggedUserUseCase } from "../../../Presentation/Users/GetLoggedUserUseCase";

export class GetLoggedUserController {
  private readonly _getLoggedUserUseCase: GetLoggedUserUseCase;
  constructor(getLoggedUserUseCase: GetLoggedUserUseCase) {
    this._getLoggedUserUseCase = getLoggedUserUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._getLoggedUserUseCase.execute(request.params.id);
    return response.status(200).json(data);
  }
}
