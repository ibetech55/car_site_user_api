import { Request, Response } from "express";
import { GetDealershipByIdUseCase } from "../../../Presentation/Dealership/GetDealershipByIdUseCase";

export class GetDealershipByIdController {
  private _getDealershipById: GetDealershipByIdUseCase;
  constructor(getDealershipById: GetDealershipByIdUseCase) {
    this._getDealershipById = getDealershipById;
  }

  async handle(request: Request, response: Response) {
    const data = await this._getDealershipById.execute(request.params.id);
    return response.status(200).json(data);
  }
}
