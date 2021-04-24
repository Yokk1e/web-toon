import { VueConstructor } from "vue";

import { Config } from "@/config";
import { HTTPClient } from "@/commons/HTTPClient";
import { Client } from "@/clients/client";

import { AuthUseCase } from "@/features/auths/AuthUseCase";
import { UserUseCase } from "@/features/users/UserUseCase";
import { RoleUseCase } from "@/features/roles/RoleUseCase";
import { PermissionUseCase } from "@/features/permission/PermissionUseCase";

const { baseURL, tokenURL } = Config;

export const httpClient = new HTTPClient({ baseURL, tokenURL });
export const client = new Client(httpClient);

export const authUseCase = new AuthUseCase(client);
export const userUseCase = new UserUseCase(client);
export const roleUseCase = new RoleUseCase(client);
export const permissionUseCase = new PermissionUseCase(client);

export interface Dependency {
  httpClient: HTTPClient;
  authUseCase: AuthUseCase;
  userUseCase: UserUseCase;
  roleUseCase: RoleUseCase;
  permissionUseCase: PermissionUseCase;
}

export const DependencyPlugin = {
  install(Vue: VueConstructor) {
    const dep: Dependency = {
      httpClient,
      authUseCase,
      userUseCase,
      roleUseCase,
      permissionUseCase,
    };

    Object.defineProperty(Vue.prototype, "$dep", {
      get() {
        return dep;
      },
    });
  },
};
