import { HTTPClient } from "../commons/HTTPClient";

import { PaginationRequestParams } from "../commons/mixins/pagination";

export class PermissionClient {
  constructor(private httpClient: HTTPClient) {}

  public async getPermissions(params: PaginationRequestParams): Promise<any> {
    const { data } = await this.httpClient.request({
      url: "/permissions",
      method: "GET",
      params,
    });

    return data;
  }
}
