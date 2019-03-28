import {HttpClient} from "../../../../common/httpClient";
import settings from "../../restServiceSettings";

export class InteractionClient extends HttpClient {
  constructor() {
    super(settings('InteractionClient'));
  }

  GetInteractions(searchDto, onFailed) {
    let final_url = ''
    final_url += 'search'
    final_url += '/';
    let bodyParm = searchDto;
    return this.Post(final_url, bodyParm, onFailed);
  }

  AddInteraction(interaction, onFailed) {
    let final_url = ''
    let bodyParm = interaction;
    return this.Post(final_url, bodyParm, onFailed);
  }
}