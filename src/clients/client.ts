import { HTTPClient } from "../commons/HTTPClient";
import { AuthClient } from "./AuthClient";
export class Client {
  constructor(private httpClient: HTTPClient) {}
  
  public auths: AuthClient = new AuthClient(this.httpClient);
}
