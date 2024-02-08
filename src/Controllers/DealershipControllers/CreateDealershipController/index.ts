import { Request, Response } from "express";
import { CreateDealershipUseCase } from "../../../Presentation/Dealership/CreateDealershipUseCase";

export class CreateDealershipController {
  private readonly _createDealershipUseCase: CreateDealershipUseCase;
  constructor(createDealershipUseCase: CreateDealershipUseCase) {
    this._createDealershipUseCase = createDealershipUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._createDealershipUseCase.execute(
      request.body,
      request.files
    );
    return response.status(201).json(data);
  }
}
