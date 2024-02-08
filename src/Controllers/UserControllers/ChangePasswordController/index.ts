import { Request, Response } from "express";
import { ChangeUserPasswordUseCase } from "../../../Presentation/Users/ChangeUserPasswordUseCase";

export class ChangeUserPasswordController {
  private _changeUserPasswordUseCase: ChangeUserPasswordUseCase;
  constructor(changeUserPasswordUseCase: ChangeUserPasswordUseCase) {
    this._changeUserPasswordUseCase = changeUserPasswordUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._changeUserPasswordUseCase.execute(
      request.params.id,
      request.body.password,
      request.body.newPassword
    );
    return response.status(200).json(data);
  }
}
