import { Client } from "../../clients/client";
import { RegisterForm } from "./forms/RegisterForm";
export class UserUseCase {
  constructor(private readonly client: Client) {}

  async register(form: RegisterForm) {
    return this.client.users.postRegister({
      email: form.email!,
      password: form.password!,
      userName: form.userName!
    });
  }
}
