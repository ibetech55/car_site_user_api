import { Request, Response } from "express";
import { ConfirmCreatedUserUseCase } from "../../../Presentation/Users/ConfirmCreatedUserUseCase";

export class ConfirmCreatedUserController {
  private _confirmCreatedUserUseCase: ConfirmCreatedUserUseCase;
  constructor(confirmCreatedUserUseCase: ConfirmCreatedUserUseCase) {
    this._confirmCreatedUserUseCase = confirmCreatedUserUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._confirmCreatedUserUseCase.execute(request.params.token);
    return response.status(200).json(data);
  }
}
