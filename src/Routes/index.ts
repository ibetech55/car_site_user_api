import { Router } from "express";
import { dealershipRoutes } from "./dealership.routes";
import { privateUser } from "./private.user.routes";
import { userRoutes } from "./user.routes";
import { accessRoutes } from "./access.routes";

const apiRoutes = Router();
apiRoutes.use([dealershipRoutes, privateUser, userRoutes, accessRoutes])

export { apiRoutes };