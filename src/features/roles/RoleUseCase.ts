import { Client } from "../../clients/client";

import { PaginationForm, Pagination } from "@/commons/mixins/pagination";
import { Role } from "./models/Role";

export class RoleUseCase {
  constructor(private client: Client) {}

  public async getRoles(form: PaginationForm): Promise<Pagination<Role>> {
    return this.client.roles.getRoles({
      page: form && form.page,
      limit: form && form.perPage,
    });
  }
}
