import axios from "axios";
import { LOCATION_API_URL } from "../../Configs/Enviroment/EnviromentVariables";

export interface GetLonLatByZipCodeDto {
  zip: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
}
export class GetLonLatByZipCode {
  private _request = axios.create({ baseURL: LOCATION_API_URL });
  async execute(zipCode: string): Promise<GetLonLatByZipCodeDto> {
    try {
      const { data } = await this._request.get(
        `/zip_code/lat_long_zip/${zipCode}`
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
