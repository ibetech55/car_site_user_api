import { Router } from "express";
import { createPrivateUserController } from "../Containers/PrivateUser/CreatePrivateUser";
import { getPrivateUserByIdController } from "../Containers/PrivateUser/GetPrivateUserById";
import { getPrivateUsersController } from "../Containers/PrivateUser/GetPrivateUsers";
import { updatePrivateUserController } from "../Containers/PrivateUser/UpdatePrivateUser";
import { deletePrivateUserController } from "../Containers/PrivateUser/DeletePrivateUser";


const privateUser = Router();
privateUser.post("/privateUser", (req, res) => createPrivateUserController.handle(req, res));
privateUser.get("/privateUser/:id", (req, res) => getPrivateUserByIdController.handle(req, res));
privateUser.get("/privateUser", (req, res) => getPrivateUsersController.handle(req, res));
privateUser.put("/privateUser/:id", (req, res) => updatePrivateUserController.handle(req, res));
privateUser.delete("/privateUser/:id", (req, res) => deletePrivateUserController.handle(req, res));

export { privateUser };