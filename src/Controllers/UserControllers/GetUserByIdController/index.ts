import { Request, Response } from "express";
import { GetUserByIdUseCase } from "../../../Presentation/Users/GetUserByIdUseCase";

export class GetUserByIdController {
  private readonly _getUserByIdUseCase: GetUserByIdUseCase;
  constructor(getUserByIdUseCase: GetUserByIdUseCase) {
    this._getUserByIdUseCase = getUserByIdUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._getUserByIdUseCase.execute(request.params.id);
    return response.status(200).json(data);
  }
}
