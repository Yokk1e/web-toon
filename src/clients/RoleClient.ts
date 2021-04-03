import { HTTPClient } from "../commons/HTTPClient";

import { PaginationRequestParams } from "@/commons/mixins/pagination";

export interface RoleRegisterRequestParams {
  name: string;
}

export interface RoleDeleteRequestParams {
  id: number;
}

export class RoleClient {
  constructor(private httpClient: HTTPClient) {}

  public async postRole(params: RoleRegisterRequestParams): Promise<any> {
    const { data } = await this.httpClient.request({
      url: "/roles",
      method: "POST",
      data: params,
    });

    return data;
  }

  public async getRoles(params: PaginationRequestParams): Promise<any> {
    const { data } = await this.httpClient.request({
      url: "/roles",
      method: "GET",
      params,
    });

    return data;
  }

  public async deleteRoles(params: RoleDeleteRequestParams): Promise<any> {
    const { data } = await this.httpClient.request({
      url: `/roles/${params.id}`,
      method: "DELETE",
    });

    return data;
  }
}
