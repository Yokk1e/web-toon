import { HTTPClient } from "@/commons/HTTPClient";

export interface UserRegisterRequestParams {
  email: string;
  password: string;
  userName: string;
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
