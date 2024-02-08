import { GetDealershipDto } from "../../../Data/Dealership/GetDealershipDto";
import { DealershipRepository } from "../../../Repositories/Dealership/dealership.repository";

class GetDealershipByIdUseCase {
  private readonly _dealershipRepository: DealershipRepository;
  constructor(dealershipRepository: DealershipRepository) {
    this._dealershipRepository = dealershipRepository;
  }

  async execute(id: string): Promise<GetDealershipDto> {
    const data = await this._dealershipRepository.getById(id);
    const dealershipData: GetDealershipDto = {
      id: data._id,
      dealershipName: data.dealership_name,
      dealershipLogo: data.dealership_logo,
      contactName: data.contact_name,
      user: {
        id: data.users._id,
        email: data.users.email,
        userType: data.users.user_type,
        active: data.users.active,
        createdAt: data.users.created_at,
        accessCode: data.users.access_code,
        address: {
          id: data.users.addresses._id,
          state: data.users.addresses.state,
          city: data.users.addresses.city,
          street: data.users.addresses.street,
          zipCode: data.users.addresses.zip_code,
        },
        phoneNumber: data.users.phone_number,
      },
    };
    return dealershipData;
  }
}

export { GetDealershipByIdUseCase };
