import bcrypt from 'bcryptjs';

export class GeneratePassword {

    constructor() {
    }

    encryptPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        return hash
      }
    
      decryptPassword(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword)
      }
}