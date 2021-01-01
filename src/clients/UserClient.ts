import { HTTPClient } from "@/commons/HTTPClient";
import { GenderType } from "../features/users/forms/RegisterForm";

export interface UserRegisterRequestParams {
  email: string;
  password: string;
  userName: string;
  gender: GenderType;
  age: number;
}

export class UserClient {
  constructor(private httpClient: HTTPClient) {}
  public async postRegister(params: UserRegisterRequestParams): Promise<any> {
    const { data } = await this.httpClient.request({
      url: "/users",
      method: "POST",
      data: params,
    });

    return data;
  }
}
