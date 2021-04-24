import { Client } from "../../clients/client";

import { PaginationForm, Pagination } from "@/commons/mixins/pagination";
import { Role } from "./models/Role";
import { RoleCreateForm } from "./forms/RoleCreateForm";
import { RoleUpdateForm } from "./forms/RoleUpdateForm";

export class RoleUseCase {
  constructor(private client: Client) {}

  async create(form: RoleCreateForm) {
    return this.client.roles.postRole({
      name: form.name,
      permissions: form.selectedPermissions,
    });
  }

  public async getRoles(form: PaginationForm): Promise<Pagination<Role>> {
    return this.client.roles.getRoles({
      page: form && form.page,
      limit: form && form.perPage,
    });
  }

  public async getRole(id: number): Promise<Role> {
    return this.client.roles.getRole(id);
  }

  public async updateRole(form: RoleUpdateForm): Promise<Role> {
    return this.client.roles.patchRoles({
      id: form.id!,
      name: form.name,
      permissions: form.selectedPermissions,
    });
  }

  public async deleteRole(id: number): Promise<Role> {
    return this.client.roles.deleteRoles({ id });
  }
}
