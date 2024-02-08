import { ConfirmAccessCodeController } from "../../../Controllers/AccessControllers/ConfirmAccessCodeController";
import { ConfirmAccessCodeUseCase } from "../../../Presentation/Access/ConfirmAccessCodeUseCase";
import { rabbitMq } from "../../../Queue/RabbitMq";
import { AccessRepository } from "../../../Repositories/Access/access.repository";
import { UserRepository } from "../../../Repositories/User/user.repository";
import { HandleAccesCode } from "../../../Utils/HandleAccesCode";


const userRepository = new UserRepository();
const accessRepository = new AccessRepository();
const handleAccessCode = new HandleAccesCode();
const confirmAccessCodeUseCase = new ConfirmAccessCodeUseCase(userRepository, accessRepository, rabbitMq, handleAccessCode)
const confirmAccessCodeController = new ConfirmAccessCodeController(confirmAccessCodeUseCase)

export {confirmAccessCodeUseCase, confirmAccessCodeController}