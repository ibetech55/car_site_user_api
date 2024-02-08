import jwt from "jsonwebtoken";
import { AppError } from "../../ErrorHandler/AppError";
import { AUTH_TOKEN_SECRET_KEY } from "../../Configs/Enviroment/EnviromentVariables";

export interface ITokenData {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    type: string;
    iat: number;
    exp: number;
  }
  
export const getUserData = (token: string): ITokenData => {
    try {
        const data = jwt.verify(token, AUTH_TOKEN_SECRET_KEY) as ITokenData;
        return data;
      } catch (error) {
        console.log(error)
        throw new AppError("Forbidden", 403);
      }
}
