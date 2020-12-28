import Vue from "vue";
import jwtDecode from "jwt-decode";

import { Client } from "../../clients/client";
import { LoginForm } from "./forms/LoginForm";

interface Token {
  permissions: string[];
}

export class LoginUseCase {
  constructor(private client: Client) {}

  public async login(form: LoginForm): Promise<void> {
    await this.client.auths.login(form);
  }

  public async logout(): Promise<any> {
    await this.client.auths.logout();
  }

  public getPermissions() {
    const token: Token = jwtDecode(
      Vue.prototype.$dep.httpClient.cacheAccessToken
    );

    return (token && token.permissions) || [];
  }

  public hasPermission(permission: string) {
    return this.getPermissions().includes(permission);
  }
}
