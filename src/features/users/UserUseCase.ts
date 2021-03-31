import { PaginationForm, Pagination } from "@/commons/mixins/pagination";
import { Client } from "../../clients/client";
import { UserCreateForm } from "./forms/UserCreateForm";
import { User } from "./models/User";
export class UserUseCase {
  constructor(private readonly client: Client) {}

  async create(form: UserCreateForm) {
    return this.client.users.postUser({
      email: form.email,
      password: form.password,
      userName: form.userName,
      role: form.role,
    });
  }

  public async getUsers(form: PaginationForm): Promise<Pagination<User>> {
    return this.client.users.getUsers({
      page: form && form.page,
      limit: form && form.perPage,
    });
  }

  public async deleteUser(id: number): Promise<User> {
    return this.client.users.deleteUsers({ id });
  }
}
