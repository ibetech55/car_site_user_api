import { Request, Response } from "express";
import { GetDealershipsUseCase } from "../../../Presentation/Dealership/GetDealershipsUseCase";

export class GetDealershipsController {
  private _getDealershipsUseCase: GetDealershipsUseCase;
  constructor(getDealershipsUseCase: GetDealershipsUseCase) {
    this._getDealershipsUseCase = getDealershipsUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._getDealershipsUseCase.execute();
    return response.status(200).json(data);
  }
}
