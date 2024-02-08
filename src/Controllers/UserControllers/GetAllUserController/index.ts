import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../../Presentation/Users/GetAllUsersUseCase";

export class GetAllUsersController {
  private _getAllUsersUseCase: GetAllUsersUseCase;
  constructor(getAllUsersUseCase: GetAllUsersUseCase) {
    this._getAllUsersUseCase = getAllUsersUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._getAllUsersUseCase.execute();
    return response.status(200).json(data);
  }
}
