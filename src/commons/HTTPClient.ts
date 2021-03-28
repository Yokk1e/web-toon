import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
} from "axios";

export interface HTTPClientOptions {
  baseURL: string;
  tokenURL: string;
}

export interface SetupTokenParams {
  email: string;
  password: string;
}

export interface OAuthToken {
  accessToken: string;
}

export class HTTPClient {
  private client: AxiosInstance;
  private baseURL: string;
  private tokenURL: string;
  public accessToken: string | undefined;

  constructor({ baseURL, tokenURL }: HTTPClientOptions) {
    this.baseURL = baseURL;
    this.tokenURL = tokenURL;

    this.accessToken = this.cacheAccessToken;

    this.client = axios.create({
      baseURL,
    });

    this.setupClient();
  }

  private setupClient() {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!this.isAxiosError(error) && !this.isAuthenticationError(error)) {
          return Promise.reject(error);
        }

        if (this.isAccessTokenExpired(error)) {
          window.location.href = window.location.origin + "/auth/login";
        }

        return Promise.reject(error);
      }
    );
  }

  private isAuthenticationError(error: AxiosError): boolean | undefined {
    return (
      error.config &&
      error.config.url === this.tokenURL &&
      error.response &&
      error.response.status === 401
    );
  }

  private isAccessTokenExpired(error: AxiosError): boolean | undefined {
    return (
      error.config &&
      error.config.url !== this.tokenURL &&
      error.response &&
      error.response.status === 401
    );
  }

  private isAxiosError(error: Error): error is AxiosError {
    const { isAxiosError }: AxiosError = error as AxiosError;

    return isAxiosError;
  }

  public async setupToken(data: SetupTokenParams): Promise<void> {
    const { data: response } = await this.client.request({
      url: this.tokenURL,
      method: "POST",
      data,
    });

    this.setToken(response);
  }

  public async clearToken(): Promise<void> {
    this.accessToken = undefined;
    this.cacheAccessToken = undefined;
  }

  public setToken(token: OAuthToken) {
    this.accessToken = token.accessToken;
    this.cacheAccessToken = token.accessToken;
  }

  public async request<T>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const configWithAuthorization = this.configWithAuthorization(
      config,
      this.accessToken
    );

    const result = await this.client.request(configWithAuthorization);

    return result;
  }

  public hasAccessToken() {
    return !!this.cacheAccessToken;
  }

  private configWithAuthorization(
    config: AxiosRequestConfig,
    token: string | undefined
  ): AxiosRequestConfig {
    const { headers = {} } = config;

    if (headers.Authorization) {
      return config;
    }
    return {
      ...config,
      headers: this.injectAuthorizationToken(headers, token),
    };
  }

  private injectAuthorizationToken(
    headers: Record<string, string>,
    token: string | undefined
  ): Record<string, string> {
    return { ...headers, Authorization: `Bearer ${token}` };
  }

  private get cacheAccessToken(): string | undefined {
    return localStorage.getItem("web_toon::accessToken") || undefined;
  }

  private set cacheAccessToken(token: string | undefined) {
    if (typeof token === "undefined") {
      localStorage.removeItem("web_toon::accessToken");
      return;
    }
    localStorage.setItem("web_toon::accessToken", token);
  }
}
