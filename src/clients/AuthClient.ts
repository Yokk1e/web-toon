import { HTTPClient } from "@/commons/HTTPClient";

export interface AuthLoginRequestParams {
  email: string;
  password: string;
}

export class AuthClient {
  constructor(private httpClient: HTTPClient) {}
  public async login(params: AuthLoginRequestParams): Promise<void> {
    await this.httpClient.setupToken(params);
  }

  public async logout(): Promise<any> {
    this.httpClient.clearToken();
  }
}
