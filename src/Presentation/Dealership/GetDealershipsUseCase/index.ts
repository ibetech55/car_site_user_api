import { GetDealershipDto } from "../../../Data/Dealership/GetDealershipDto";
import { DealershipRepository } from "../../../Repositories/Dealership/dealership.repository";

class GetDealershipsUseCase {
  private readonly _dealershipRepository: DealershipRepository;
  constructor(dealershipRepository: DealershipRepository) {
    this._dealershipRepository = dealershipRepository;
  }

  async execute(): Promise<GetDealershipDto[]> {
    const data = await this._dealershipRepository.find();
    const dealershipData: GetDealershipDto[] = data.map((x) => ({
      id: x._id,
      dealershipName: x.dealership_name,
      dealershipLogo: x.dealership_logo,
      contactName: x.contact_name,
      user: {
        id: x.users._id,
        email: x.users.email,
        userType: x.users.user_type,
        active: x.users.active,
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
    return dealershipData;
  }
}

export { GetDealershipsUseCase };
