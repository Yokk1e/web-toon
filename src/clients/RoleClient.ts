import { HTTPClient } from "../commons/HTTPClient";

import { PaginationRequestParams } from "@/commons/mixins/pagination";

export interface RoleCreateRequestParams {
  name: string;
  permissions: number[];
}

export interface RoleUpdateRequestParams {
  id: number;
  name: string;
  permissions: number[];
}

export interface RoleDeleteRequestParams {
  id: number;
}

export class RoleClient {
  constructor(private httpClient: HTTPClient) {}

  public async postRole(params: RoleCreateRequestParams): Promise<any> {
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

  public async getRole(id: number): Promise<any> {
    const { data } = await this.httpClient.request({
      url: `/roles/${id}`,
      method: "GET",
    });

    return data;
  }

  public async patchRoles(params: RoleUpdateRequestParams): Promise<any> {
    const { id, ...body } = params;
    const { data } = await this.httpClient.request({
      url: `/roles/${id}`,
      method: "PATCH",
      data: body,
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
