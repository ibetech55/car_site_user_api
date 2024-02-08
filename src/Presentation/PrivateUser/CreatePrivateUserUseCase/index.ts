import { FileArray, UploadedFile } from "express-fileupload";
import { CreatePrivateUserDto } from "../../../Data/PrivateUser/CreatePrivateUserDto";
import { IAddressRepository } from "../../../Repositories/Address/IAddressRepository";
import { IPrivateUserRepository } from "../../../Repositories/PrivateUser/IPrivateUserRepository";
import { IUserRepository } from "../../../Repositories/User/IUserRespository";
import { FileHandler } from "../../../Utils/FileHandler";
import { GenerateImageName } from "../../../Utils/GenerateImageName";
import { GeneratePassword } from "../../../Utils/GeneratePassword";
import { Users } from "../../../Entities/user";
import { CreateAddressDto } from "../../../Data/address/createAddressDto";
import { AccessCodeProviderPrivateUserDto } from "../../../Queue/QueueDtos/AccessCodeProviderDto";
import {
  ACCESS_CODE_PRIVATE_USER,
  REGISTER_AUTH_USER,
  REGISTER_USER_CAR_API,
} from "../../../Queue/types";
import { RegisterAuthUserProviderDto } from "../../../Queue/QueueDtos/RegisterAuthUserProviderDto";
import { RegisterCarUserProviderDto } from "../../../Queue/QueueDtos/RegisterCarUserProviderDto";
import { CreateUserDto } from "../../../Data/User/createUserDto";
import { AppError } from "../../../ErrorHandler/AppError";
import { RabbitMq } from "../../../Queue/RabbitMq/RabbitMq";
import { HandleAccesCode } from "../../../Utils/HandleAccesCode";
import { IAccessRepository } from "../../../Repositories/Access/IAccessRepository";
import { REGISTER_PRIVATE_USER_ACCESS_CODE } from "../../../Configs/Constants/AccessTypes";
import { GetCreatedUser } from "../../../Data/Dealership/CreateDealershipDto";
import { ACCESS_CODE_SECRET_KEY, CREATED_USER_SECRET_KEY } from "../../../Configs/Enviroment/EnviromentVariables";
import { HandleToken } from "../../../Utils/HandleToken";
import { ACCOUNT_CREATED } from "../../../Configs/Constants/AccountStatus";

export class CreatePrivateUserUseCase {
  private readonly _privateUserRepository: IPrivateUserRepository;
  private readonly _userRepository: IUserRepository;
  private readonly _addressRepository: IAddressRepository;
  private readonly _accessRepository: IAccessRepository;
  private readonly _rabbitMq: RabbitMq;
  private readonly _handleAccessCode: HandleAccesCode;
  private readonly _generatePassword: GeneratePassword;
  private readonly _fileHandler: FileHandler;
  private readonly _generateImageName: GenerateImageName;
  private readonly _handleToken: HandleToken;

  constructor(
    privateUserRepository: IPrivateUserRepository,
    userRepository: IUserRepository,
    addressRepository: IAddressRepository,
    accessRepository: IAccessRepository,
    rabbitMq: RabbitMq,
    handleAccessCode: HandleAccesCode,
    generatePassword: GeneratePassword,
    fileHandler: FileHandler,
    generateImageName: GenerateImageName,
    handleToken: HandleToken
  ) {
    this._privateUserRepository = privateUserRepository;
    this._userRepository = userRepository;
    this._addressRepository = addressRepository;
    this._accessRepository = accessRepository;
    this._rabbitMq = rabbitMq;
    this._handleAccessCode = handleAccessCode;
    this._generatePassword = generatePassword;
    this._fileHandler = fileHandler;
    this._generateImageName = generateImageName;
    this._handleToken = handleToken;
  }

  async execute(values: CreatePrivateUserDto, file?: FileArray): Promise<string> {
    const userRequestData: CreateUserDto = JSON.parse(values.user as string);
    const checkEmail = await this._userRepository.getUserByEmail(
      userRequestData.email
    );
    if (checkEmail) {
      throw new AppError("E-mail already exists", 400);
    }
    let userImage: UploadedFile;
    let imageName: string;
    if (file) {
      userImage = file.userImage as UploadedFile;
      imageName = this._generateImageName.handle(
        userImage.mimetype.split("/")[1]
      );
    }


    const addreddRequestData = userRequestData.address as CreateAddressDto;
    const addressData = await this._addressRepository.create({
      state: addreddRequestData.state,
      city: addreddRequestData.city,
      street: addreddRequestData.street,
      zip_code: addreddRequestData.zipCode,
    });

    const userData: Users = await this._userRepository.create({
      email: userRequestData.email,
      user_type: "private_user",
      phone_number: userRequestData.phoneNumber,
      password: this._generatePassword.encryptPassword(
        userRequestData.password
      ),
      active: false,
      account_status: ACCOUNT_CREATED,
      address_id: addressData._id
    });


    const privateUserData = await this._privateUserRepository.create({
      first_name: values.firstName,
      last_name: values.lastName,
      user_image: userImage ? imageName : null,
      user_id: userData._id,
      date_of_birth: values.dateOfBirth,
    });
    const accessData = await this._accessRepository.create({
      access_code: this._handleAccessCode.generateAccessCode(),
      access_code_token: this._handleAccessCode.generateAccessCodeToken(
        userData._id
      ),
      active: true,
      type: REGISTER_PRIVATE_USER_ACCESS_CODE,
      user_id: userData._id,
    });

    if (file) {
      await this._fileHandler.postFiles(userImage.data, imageName);
    }
    this._rabbitMq.publish<AccessCodeProviderPrivateUserDto>(
      ACCESS_CODE_PRIVATE_USER,
      {
        user_id: userData._id,
        first_name: privateUserData.first_name,
        last_name: privateUserData.last_name,
        email: userData.email,
        access_code: accessData.access_code,
        access_code_token: accessData.access_code_token,
      }
    );

    this._rabbitMq.publish<RegisterAuthUserProviderDto>(REGISTER_AUTH_USER, {
      user_id: userData._id,
      first_name: privateUserData.first_name,
      last_name: privateUserData.last_name,
      email: userData.email,
      active: userData.active,
      type: userData.user_type,
      password: userData.password,
      access_code: accessData.access_code,
    });

    this._rabbitMq.publish<RegisterCarUserProviderDto>(
      REGISTER_USER_CAR_API,
      {
        user_id: userData._id,
        first_name: privateUserData.first_name,
        last_name: privateUserData.last_name,
        email: userData.email,
        type: userData.user_type,
        phone_number: userData.phone_number,
      }
    );

    const createdUserToken = this._handleToken.generateToken<GetCreatedUser>(
      {
        id: userData._id,
        email: userData.email,
        userType: userData.user_type,
        active: userData.active,
        accountStatus: userData.account_status,
      },
      CREATED_USER_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return createdUserToken;
  }
}
