import { Request, Response } from "express";
import { UpdatePrivateUserUseCase } from "../../../Presentation/PrivateUser/UpdatePrivateUserUseCase";

export class UpdatePrivateUserController {
  private _updatePrivateUserUseCase: UpdatePrivateUserUseCase;
  constructor(updatePrivateUserUseCase: UpdatePrivateUserUseCase) {
    this._updatePrivateUserUseCase = updatePrivateUserUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._updatePrivateUserUseCase.execute(request.params.id, request.body);
    return response.status(200).json(data);
  }
}
