import { Request, Response } from "express";
import cookie from 'cookie';
import { getUserData } from "../../../Utils/GetUserId";
import { UpdateDealershipUseCase } from "../../../Presentation/Dealership/UpdateDealershipUseCase";

export class UpdateDealershipController {
  private _updateDealershipUseCase: UpdateDealershipUseCase;
  constructor(updateDealershipUseCase: UpdateDealershipUseCase) {
    this._updateDealershipUseCase = updateDealershipUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._updateDealershipUseCase.execute(request.params.id, request.body);
    return response.status(200).json(data);
  }
}
