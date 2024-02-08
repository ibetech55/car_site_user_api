import { Request, Response } from "express";
import { DeleteDealershipUseCase } from "../../../Presentation/Dealership/DeleteDealershipUseCase";

export class DeleteDealershipController {
  private readonly _deleteDealershipUseCase: DeleteDealershipUseCase;

  constructor(deleteDealershipUseCase: DeleteDealershipUseCase) {
    this._deleteDealershipUseCase = deleteDealershipUseCase;
  }

  async handle(request: Request, response: Response) {
    const data = await this._deleteDealershipUseCase.execute(request.params.id);

    return response.status(200).json(data);
  }
}
