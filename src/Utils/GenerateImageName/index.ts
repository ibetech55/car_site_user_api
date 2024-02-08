import crypto from "crypto";

export class GenerateImageName {
  constructor() {}

  handle(fileExt:string) {
    const timestamp = Date.now().toString();
    const random = crypto.randomBytes(32).toString("hex");
    return `${random}${timestamp}.${fileExt}`;
  }
}
