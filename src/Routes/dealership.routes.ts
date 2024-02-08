import { Router } from "express";
import { updateDealershipController } from "../Containers/Dealership/UpdateDealership";
import { createDealershipController } from "../Containers/Dealership/CreateDealership";
import { getDealershipByIdController } from "../Containers/Dealership/GetDealershipById";
import { getDealershipsController } from "../Containers/Dealership/GetDealerships";
import { deleteDealershipController } from "../Containers/Dealership/DeleteDealership";


const dealershipRoutes = Router();
dealershipRoutes.post("/dealership", (req, res) => createDealershipController.handle(req, res));
dealershipRoutes.put("/dealership/:id", (req, res) => updateDealershipController.handle(req, res));
dealershipRoutes.get("/dealership/:id", (req, res) => getDealershipByIdController.handle(req, res));
dealershipRoutes.get("/dealership", (req, res) => getDealershipsController.handle(req, res));
dealershipRoutes.delete("/dealership/:id", (req, res) => deleteDealershipController.handle(req, res));

export { dealershipRoutes };