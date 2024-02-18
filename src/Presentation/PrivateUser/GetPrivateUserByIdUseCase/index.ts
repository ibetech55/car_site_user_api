import {
  GetPrivateUserDto,
} from "../../../Data/PrivateUser/GetPrivateUserDto";
import { PrivateUserRepository } from "../../../Repositories/PrivateUser/private.user.repository";

export class GetPrivateUserByIdUseCase {
  private readonly _privateUserRepository: PrivateUserRepository;
  constructor(privateUserRepository: PrivateUserRepository) {
    this._privateUserRepository = privateUserRepository;
  }

  async execute(id: string): Promise<GetPrivateUserDto> {
    const data = await this._privateUserRepository.getById(id);
    const privateUserData: GetPrivateUserDto = {
        id: data._id,
        firstName: data.first_name,
        lastName: data.last_name,
        userImage: data.user_image,
        dateOfBirth: data.date_of_birth,
        user: {
            id: data.users._id,
            email: data.users.email,
            userType: data.users.user_type,
            active: false,
            createdAt: data.users.created_at,
            address: {
                id: data.users.addresses._id,
                state: data.users.addresses.state,
                city: data.users.addresses.city,
                street: data.users.addresses.street,
                zipCode: data.users.addresses.zip_code
            },
            phoneNumber: data.users.phone_number
        },
    };
    return privateUserData;
  }
}

