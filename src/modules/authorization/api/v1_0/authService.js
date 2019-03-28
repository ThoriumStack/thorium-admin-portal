import settings from "../restServiceSettings";
import {HttpClient} from "@/common/httpClient";

export class AuthClient extends HttpClient {
  constructor(returnUrl) {
    super(settings('AuthClient'), returnUrl);
  }
  GetAuthDetails(onFailed)
  {
    let final_url = ''
    return this.Get(final_url, onFailed);
  }
}