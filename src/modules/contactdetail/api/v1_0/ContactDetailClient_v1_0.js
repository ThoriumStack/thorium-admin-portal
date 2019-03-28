import {HttpClient} from "@/common/httpClient";
import settings from "../restServiceSettings";

export class ContactDetailClient extends HttpClient {
  constructor() {
    super(settings('ContactDetailClient'));
  }

  GetAllContacts(onFailed) {
    let final_url = ''
    return this.Get(final_url, onFailed);
  }

  GetContact(contactId, onFailed) {
    let final_url = ''
    final_url += contactId
    return this.Get(final_url, onFailed);
  }

  CreateContact(personalDetailDto, onFailed) {
    let final_url = ''
    let bodyParm = personalDetailDto;
    return this.Post(final_url, bodyParm, onFailed);
  }

  DeleteContact(contactId, onFailed) {
    let final_url = ''
    final_url += contactId
    return this.Delete(final_url, onFailed);
  }

  UpdateContact(personalDetailDto, onFailed) {
    let final_url = ''
    let bodyParm = personalDetailDto;
    return this.Patch(final_url, bodyParm, onFailed);
  }
}