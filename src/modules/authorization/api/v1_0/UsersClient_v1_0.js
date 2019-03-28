import {HttpClient} from "@/common/httpClient";
import settings from "../restServiceSettings";

export class UsersClient extends HttpClient {
  constructor() {
    super(settings('UsersClient'));
  }

  GetUsers(pageIndex, pageSize, onFailed) {
    let final_url = ''
    final_url += '?';
    final_url += 'pageIndex=' + pageIndex
    final_url += '&';
    final_url += 'pageSize=' + pageSize
    return this.Get(final_url, onFailed);
  }
}