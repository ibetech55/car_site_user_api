import {
  UpdateDealershipDbDto,
  UpdateDealershipDto,
} from "../../../Data/Dealership/UpdateDealershipDto";
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
import { AddressRepository } from "../../../Repositories/Address/address.repository";
import { IDealershipRepository } from "../../../Repositories/Dealership/IDealershipRespository";
import { DealershipRepository } from "../../../Repositories/Dealership/dealership.repository";
import { IUserRepository } from "../../../Repositories/User/IUserRespository";
import { UserRepository } from "../../../Repositories/User/user.repository";

class UpdateDealershipUseCase {
  private readonly _dealershipRepository: IDealershipRepository;
  private readonly _userRepository: IUserRepository;
  private readonly _addressRepository: IAddressRepository;
  private readonly _rabbitMq: RabbitMq;
  constructor(
    dealershipRepository: DealershipRepository,
    userRepository: UserRepository,
    addressRepository: AddressRepository,
    rabbitMq: RabbitMq
  ) {
    this._dealershipRepository = dealershipRepository;
    this._userRepository = userRepository;
    this._addressRepository = addressRepository;
    this._rabbitMq = rabbitMq;
  }

  async execute(id: string, values: UpdateDealershipDto) {
    const dealershipData = await this._dealershipRepository.getById(id);
    if (!dealershipData) {
      throw new AppError("No User Found", 400);
    }

    const updateDealershipValues: UpdateDealershipDbDto = {};
    const updateAddressValues: UpdateAddressDbDto = {};
    const updateUserValues: UpdateUserDbDto = {};
    let updateAuthUserProvider: UpdateAuthUserProviderDto = {
      user_id: dealershipData.user_id,
    };
    let updateCarUserProvider: UpdateCarUserProviderDto = {
      user_id: dealershipData.user_id,
    };
    if (values.dealership) {
      if (values.dealership.contactName) {
        updateDealershipValues.contact_name = values.dealership.contactName;
      }
      if (values.dealership.dealershipName) {
        updateDealershipValues.dealership_name =
          values.dealership.dealershipName;
        updateAuthUserProvider.dealership_name =
          values.dealership.dealershipName;
        updateCarUserProvider.dealership_name =
          values.dealership.dealershipName;
      }

      await this._dealershipRepository.update(
        dealershipData._id,
        updateDealershipValues
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
        dealershipData.users.address_id,
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
        dealershipData.users._id,
        updateUserValues
      );
    }

    if (
      updateAuthUserProvider.dealership_name ||
      updateAuthUserProvider.active
    ) {
      this._rabbitMq.publish<UpdateAuthUserProviderDto>(
        USER_API_UPDATE_AUTH_USER,
        updateAuthUserProvider
      );
    }

    if (
      updateDealershipValues.dealership_name ||
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

export { UpdateDealershipUseCase };
