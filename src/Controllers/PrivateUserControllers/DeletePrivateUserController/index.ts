import { Request, Response } from "express";
import { DeletePrivateUserUseCase } from "../../../Presentation/PrivateUser/DeletePrivateUserUseCase";

export class DeletePrivateUserController {
  private readonly _deletePrivateUserUseCase: DeletePrivateUserUseCase;

  constructor(deletePrivateUserUseCase: DeletePrivateUserUseCase) {
    this._deletePrivateUserUseCase = deletePrivateUserUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._deletePrivateUserUseCase.execute(request.params.id);

    return response.status(200).json(data);
  }
}
