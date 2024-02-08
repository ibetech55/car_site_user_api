import { Router } from "express";
import { getByAccessCodeTokenController } from "../Containers/Access/GetByAccessCodeToken";
import { confirmAccessCodeController } from "../Containers/Access/ConfirmAccessCode";

const accessRoutes = Router();
accessRoutes.get("/access/:token", (req, res) =>
  getByAccessCodeTokenController.handle(req, res)
);
accessRoutes.put("/access/confirmAccessCode/:id", (req, res) =>
  confirmAccessCodeController.handle(req, res)
);

export { accessRoutes };
