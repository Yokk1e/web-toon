import { Client } from "../../clients/client";

import { PaginationForm, Pagination } from "@/commons/mixins/pagination";
import { Role } from "./models/Role";
import { RoleCreateForm } from "./forms/RoleCreateForm";

export class RoleUseCase {
  constructor(private client: Client) {}

  async create(form: RoleCreateForm) {
    return this.client.roles.postRole({
      name: form.name
    });
  }

  public async getRoles(form: PaginationForm): Promise<Pagination<Role>> {
    return this.client.roles.getRoles({
      page: form && form.page,
      limit: form && form.perPage,
    });
  }



  public async deleteRole(id: number): Promise<Role> {
    return this.client.roles.deleteRoles({ id });
  }
}
