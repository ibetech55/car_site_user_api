import { Router } from "express";
import { getAllUsersController } from "../Containers/Users/GetAllUsers";
import { getUserByIdController } from "../Containers/Users/GetUserById";
import { changeUserPasswordController } from "../Containers/Users/ChangePassword";
import { confirmCreatedUserController } from "../Containers/Users/ConfirmCreatedUser";
import { getLoggedUserController } from "../Containers/Users/GetLoggedUser";

const userRoutes = Router();

userRoutes.get("/user", (req, res) => getAllUsersController.handle(req, res));
userRoutes.get("/user/:id", (req, res) =>
  getUserByIdController.handle(req, res)
);
userRoutes.get("/user/getByEmail/:email", (req, res) =>
  getUserByIdController.handle(req, res)
);

userRoutes.put("/user/changeUserPassword/:id", (req, res) =>
  changeUserPasswordController.handle(req, res)
);

userRoutes.get("/user/confirmCreatedUser/:token", (req, res) =>
  confirmCreatedUserController.handle(req, res)
);

userRoutes.get("/user/loggedUser/:id", (req, res) =>
  getLoggedUserController.handle(req, res)
);

export { userRoutes };
