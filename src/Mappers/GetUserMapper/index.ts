import { GetUserDto } from "../../Data/User/getUserDto";
import { Users } from "../../Entities/user";

export class GetUserMapper {
  map(values: Users): GetUserDto {
    return {
      id: values._id,
      email: values.email,
      userType: values.user_type,
      phoneNumber:values.phone_number,
      active: values.active,
      createdAt: values.created_at,
      accountStatus: values.account_status,
      address: {
        id: values.addresses._id,
        state: values.addresses.state,
        city: values.addresses.city,
        street: values.addresses.street,
        zipCode: values.addresses.zip_code,
      },
      privateUser: values.privateUsers ? {
        id: values.privateUsers._id,
        firstName: values.privateUsers.first_name,
        lastName: values.privateUsers.last_name,
        userImage: values.privateUsers.user_image,
        dateOfBirth: values.privateUsers.date_of_birth,
      } : null,
      dealership: values.dealerships ? {
        id: values.dealerships._id,
        dealershipName: values.dealerships.dealership_name,
        dealershipLogo: values.dealerships.dealership_logo,
        contactName: values.dealerships.contact_name,
      } : null
    };
  }
}
