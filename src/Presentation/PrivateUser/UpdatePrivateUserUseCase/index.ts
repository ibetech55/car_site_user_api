import {
  UpdatePrivateUserDbDto,
  UpdatePrivateUserDto,
} from "../../../Data/PrivateUser/UpdatePrivateUserDto";
import { UpdateUserDbDto } from "../../../Data/User/updateUserDto";
import { UpdateAddressDbDto } from "../../../Data/address/UpdateAddressDto";
import { AppError } from "../../../ErrorHandler/AppError";
import { UpdateAuthUserProviderDto } from "../../../Queue/QueueDtos/UpdateAuthUserProviderDto";
import { UpdateCarUserProviderDto } from "../../../Queue/QueueDtos/UpdateCarUserProviderDto";
import { RabbitMq } from "../../../Queue/RabbitMq/RabbitMq";
import {
  USER_API_UPDATE_AUTH_USER,
  USER_API_UPDATE_CAR_USER,
} from "../../../Queue/types";
import { IAddressRepository } from "../../../Repositories/Address/IAddressRepository";
import { IPrivateUserRepository } from "../../../Repositories/PrivateUser/IPrivateUserRepository";
import { IUserRepository } from "../../../Repositories/User/IUserRespository";

class UpdatePrivateUserUseCase {
  private readonly _privateUserRepository: IPrivateUserRepository;
  private readonly _userRepository: IUserRepository;
  private readonly _addressRepository: IAddressRepository;
  private readonly _rabbitMq: RabbitMq;
  constructor(
    privateUserRepository: IPrivateUserRepository,
    userRepository: IUserRepository,
    addressRepository: IAddressRepository,
    defaultProvider: RabbitMq
  ) {
    this._privateUserRepository = privateUserRepository;
    this._userRepository = userRepository;
    this._addressRepository = addressRepository;
    this._rabbitMq = defaultProvider;
  }

  async execute(id: string, values: UpdatePrivateUserDto) {
    const privateUserData = await this._privateUserRepository.getById(id);
    if (!privateUserData) {
      throw new AppError("No User Found", 400);
    }

    const updatePrivateUserValues: UpdatePrivateUserDbDto = {};
    const updateAddressValues: UpdateAddressDbDto = {};
    const updateUserValues: UpdateUserDbDto = {};
    const updateAuthUserProvider: UpdateAuthUserProviderDto = {
      user_id: privateUserData.user_id,
    };
    const updateCarUserProvider: UpdateCarUserProviderDto = {
      user_id: privateUserData.user_id,
    };
    if (values.privateUser) {
      if (values.privateUser.firstName) {
        updatePrivateUserValues.first_name = values.privateUser.firstName;
        updateAuthUserProvider.first_name = values.privateUser.firstName;
        updateCarUserProvider.first_name = values.privateUser.firstName;
      }
      if (values.privateUser.lastName) {
        updatePrivateUserValues.last_name = values.privateUser.lastName;
        updateAuthUserProvider.last_name = values.privateUser.lastName;
        updateCarUserProvider.last_name = values.privateUser.lastName;
      }
      if (values.privateUser.dateOfBirth) {
        updatePrivateUserValues.date_of_birth = values.privateUser.dateOfBirth;
      }

      await this._privateUserRepository.update(
        privateUserData._id,
        updatePrivateUserValues
      );
    }

    if (values.address) {
      if (values.address.city) {
        updateAddressValues.city = values.address.city;
      }
      if (values.address.state) {
        updateAddressValues.state = values.address.state;
      }
      if (values.address.street) {
        updateAddressValues.street = values.address.street;
      }
      if (values.address.zipCode) {
        updateAddressValues.zip_code = values.address.zipCode;
      }
      await this._addressRepository.update(
        privateUserData.users.address_id,
        updateAddressValues
      );
    }

    if (values.user) {
      if (typeof values.user.active === "boolean") {
        updateUserValues.active = values.user.active;
        updateAuthUserProvider.active = values.user.active;
      }

      if (values.user.phoneNumber) {
        updateUserValues.phone_number = values.user.phoneNumber;
        updateCarUserProvider.phone_number = values.user.phoneNumber;
      }

      await this._userRepository.updateUser(
        privateUserData.users._id,
        updateUserValues
      );
    }

    if (
      updateAuthUserProvider.first_name ||
      updateAuthUserProvider.last_name ||
      updateAuthUserProvider.active
    ) {
      this._rabbitMq.publish<UpdateAuthUserProviderDto>(
        USER_API_UPDATE_AUTH_USER,
        updateAuthUserProvider
      );
    }

    if (
      updateAuthUserProvider.first_name ||
      updateAuthUserProvider.last_name ||
      updateUserValues.phone_number
    ) {
      this._rabbitMq.publish<UpdateCarUserProviderDto>(
        USER_API_UPDATE_CAR_USER,
        updateCarUserProvider
      );
    }

    return true;
  }
}

export { UpdatePrivateUserUseCase };
