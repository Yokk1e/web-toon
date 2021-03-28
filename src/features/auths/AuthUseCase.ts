import Vue from "vue";
import jwtDecode from "jwt-decode";

import { Client } from "../../clients/client";
import { AuthLoginForm } from "./forms/AuthLoginForm";

interface Token {
  permissions: string[];
}

export class AuthUseCase {
  constructor(private client: Client) {}

  public async login(form: AuthLoginForm): Promise<void> {
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
