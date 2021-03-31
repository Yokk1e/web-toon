import { HTTPClient } from "../commons/HTTPClient";
import { AuthClient } from "./AuthClient";
import { UserClient } from "./UserClient";
import { RoleClient } from "./RoleClient";
export class Client {
  constructor(private httpClient: HTTPClient) {}

  public auths: AuthClient = new AuthClient(this.httpClient);
  public users: UserClient = new UserClient(this.httpClient);
  public roles: RoleClient = new RoleClient(this.httpClient);
}
