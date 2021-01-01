import { HTTPClient } from "../commons/HTTPClient";
import { AuthClient } from "./AuthClient";
import { UserClient } from "./UserClient";
export class Client {
  constructor(private httpClient: HTTPClient) {}

  public auths: AuthClient = new AuthClient(this.httpClient);
  public users: UserClient = new UserClient(this.httpClient);
}
