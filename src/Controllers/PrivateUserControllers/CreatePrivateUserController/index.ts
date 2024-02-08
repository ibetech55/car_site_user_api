import { Request, Response } from "express";
import { CreatePrivateUserUseCase } from "../../../Presentation/PrivateUser/CreatePrivateUserUseCase";

export class CreatePrivateUserController {
  private readonly _createPrivateUserUseCase: CreatePrivateUserUseCase;
  constructor(createPrivateUserUseCase: CreatePrivateUserUseCase) {
    this._createPrivateUserUseCase = createPrivateUserUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._createPrivateUserUseCase.execute(
      request.body,
      request.files
    );
    return response.status(201).json(data);
  }
}
