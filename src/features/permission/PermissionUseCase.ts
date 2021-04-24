import { Client } from "../../clients/client";

import { PaginationForm, Pagination } from "@/commons/mixins/pagination";
import { Permission } from "./models/Permission";

export class PermissionUseCase {
  constructor(private client: Client) {}

  public async getPermissions(
    form: PaginationForm
  ): Promise<Pagination<Permission>> {
    return this.client.permissions.getPermissions({
      page: form && form.page,
      limit: form && form.perPage,
    });
  }
}
