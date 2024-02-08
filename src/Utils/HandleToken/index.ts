import jwt from "jsonwebtoken";

export class HandleToken {
  constructor() {}

  generateToken<T extends string | object | Buffer>(
    data: T,
    secretKey: string,
    options?: jwt.SignOptions
  ): string {
    return jwt.sign(data, secretKey, options);
  }

  verifyToken<T>(token: string, secretKey:string):T | false {
    try {
      return jwt.verify(token, secretKey) as T;
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
