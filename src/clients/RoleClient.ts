import { HTTPClient } from "../commons/HTTPClient";

import { PaginationRequestParams } from "@/commons/mixins/pagination";

export class RoleClient {
  constructor(private httpClient: HTTPClient) {}

  public async getRoles(params: PaginationRequestParams): Promise<any> {
    const { data } = await this.httpClient.request({
      url: "/roles",
      method: "GET",
      params,
    });

    return data;
  }
}
