import crypto from "crypto";
import jwt from "jsonwebtoken";
import { ACCESS_CODE_SECRET_KEY } from "../../Configs/Enviroment/EnviromentVariables";

export interface ITokenData {
  userId: string;
  iat: number;
  exp: number;
}

export class HandleAccesCode {
  constructor() {}

  generateAccessCode(): string {
    const random = crypto.randomInt(100000, 1000000);
    return random.toString();
  }

  generateAccessCodeToken(userId: string): string {
    return jwt.sign({ userId }, ACCESS_CODE_SECRET_KEY);
  }

  decodeAccessToken(accessToken: string): ITokenData {
    return jwt.verify(accessToken, ACCESS_CODE_SECRET_KEY) as ITokenData;
  }
}
