import { VueConstructor } from "vue";

import { Config } from "@/config";
import { HTTPClient } from "@/commons/HTTPClient";
import { Client } from "@/clients/client";

import { LoginUseCase } from "@/features/login/LoginUseCase";

const { baseURL, tokenURL } = Config;

export const httpClient = new HTTPClient({ baseURL, tokenURL });
export const client = new Client(httpClient);

export const loginUseCase = new LoginUseCase(client);

export interface Dependency {
  httpClient: HTTPClient;
  loginUseCase: LoginUseCase;
}

export const DependencyPlugin = {
  install(Vue: VueConstructor) {
    const dep: Dependency = {
      httpClient,
      loginUseCase,
    };

    Object.defineProperty(Vue.prototype, "$dep", {
      get() {
        return dep;
      },
    });
  },
};
