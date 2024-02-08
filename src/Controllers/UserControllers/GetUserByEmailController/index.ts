import { Request, Response } from "express";
import { GetUserByEmailUseCase } from "../../../Presentation/Users/GetUserByEmailUseCase";

export class GetUserByEmailController {
  private _getUserByEmailUseCase: GetUserByEmailUseCase;
  constructor(getUserByEmailUseCase: GetUserByEmailUseCase) {
    this._getUserByEmailUseCase = getUserByEmailUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._getUserByEmailUseCase.execute(
      request.params.email
    );
    return response.status(200).json(data);
  }
}
