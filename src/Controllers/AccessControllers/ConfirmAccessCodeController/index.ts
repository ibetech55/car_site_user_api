import { Request, Response } from "express";
import { ConfirmAccessCodeUseCase } from "../../../Presentation/Access/ConfirmAccessCodeUseCase";

export class ConfirmAccessCodeController {
  private _confirmAccessCodeUseCase: ConfirmAccessCodeUseCase;
  constructor(confirmAccessCodeUseCase: ConfirmAccessCodeUseCase) {
    this._confirmAccessCodeUseCase = confirmAccessCodeUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._confirmAccessCodeUseCase.execute(
      request.params.id,
      request.body.accessCode,
      request.body.accessCodeToken
    );
    return response.status(200).json(data);
  }
}
