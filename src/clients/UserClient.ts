import { HTTPClient } from "@/commons/HTTPClient";
import { PaginationRequestParams } from "@/commons/mixins/pagination";

export interface UserRegisterRequestParams {
  email: string;
  password: string;
  userName: string;
}

export interface UserUpdateRequestParams {
  id: number;
  role: number;
}

export interface UserDeleteRequestParams {
  id: number;
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

  public async getUser(id: number): Promise<any> {
    const { data } = await this.httpClient.request({
      url: `/users/${id}`,
      method: "GET"
    });

    return data;
  }

  public async getUsers(params: PaginationRequestParams): Promise<any> {
    const { data } = await this.httpClient.request({
      url: "/users",
      method: "GET",
      params
    });

    return data;
  }

  public async patchUsers(params: UserUpdateRequestParams): Promise<any> {
    const { id, ...body } = params;
    const { data } = await this.httpClient.request({
      url: `/users/${id}`,
      method: "PATCH",
      data: body
    });

    return data;
  }

  public async deleteUsers(params: UserDeleteRequestParams): Promise<any> {
    const { data } = await this.httpClient.request({
      url: `/users/${params.id}`,
      method: "DELETE"
    });

    return data;
  }
}
