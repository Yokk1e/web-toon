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
  private baseUrl: string;
  private tokenUrl: string;
  public accessToken: string | undefined;

  constructor({ baseURL, tokenURL }: HTTPClientOptions) {
    this.baseUrl = baseURL;
    this.tokenUrl = tokenURL;

    this.accessToken = this.cacheAccessToken;

    this.client = axios.create({
      baseURL,
    });

    // this.setupClient();
  }

  public async setupToken(data: SetupTokenParams): Promise<void> {
    const { data: response } = await this.client.request({
      url: this.tokenUrl,
      method: "POST",
      data,
    });

    this.setToken(response.data);
  }

  public async clearToken(): Promise<void> {
    this.accessToken = undefined;
    this.cacheAccessToken = undefined;
  }

  public setToken(token: OAuthToken) {
    this.accessToken = token.accessToken;
    this.cacheAccessToken = token.accessToken;
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
