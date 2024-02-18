import { GetPrivateUserDto } from "../../../Data/PrivateUser/GetPrivateUserDto";
import { PrivateUserRepository } from "../../../Repositories/PrivateUser/private.user.repository";

export class GetPrivateUsersUseCase {
  private readonly _privateUserRepository: PrivateUserRepository;
  constructor(privateUserRepository: PrivateUserRepository) {
    this._privateUserRepository = privateUserRepository;
  }

  async execute(): Promise<GetPrivateUserDto[]> {
    const data = await this._privateUserRepository.find();
    const privateUsersData = data.map((x) => ({
      id: x._id,
      firstName: x.first_name,
      lastName: x.last_name,
      userImage: x.user_image,
      dateOfBirth: x.date_of_birth,
      user: {
        id: x.users._id,
        email: x.users.email,
        userType: x.users.user_type,
        active: false,
        createdAt: x.users.created_at,
        address: {
          id: x.users.addresses._id,
          state: x.users.addresses.state,
          city: x.users.addresses.city,
          street: x.users.addresses.street,
          zipCode: x.users.addresses.zip_code,
        },
        phoneNumber: x.users.phone_number,
      },
    }));
    return privateUsersData;
  }
}
