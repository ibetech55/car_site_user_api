import { GetUserDto } from "../User/getUserDto";

export interface GetDealershipDto {
  id: string;
  dealershipName: string;
  dealershipLogo: string;
  contactName: string;
  user: GetUserDto;
}
