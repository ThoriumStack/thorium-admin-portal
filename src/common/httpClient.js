//import store from '@/store/store'
import {HttpError} from '@/common/httpError'
import * as download from '@/common/download'
import handleError from '@/common/httpErrorHandler'
export const settings = {
  vueInstance: null
}
export class HttpClient {
  constructor(baseUrl, enableCors=true) {
    this.baseUrl = baseUrl;

    this.enableCors = enableCors;
      this.vueInstance = settings.vueInstance;

  }

  // constructor(baseUrl, enableCors) {
  //   this.baseUrl = baseUrl;
  //   this.enableCors = enableCors;
  //
  //   this.vueInstance = settings.vueInstance;
  //
  // }

  UiFetch(url, method, body = null) {
    let fetchOptions = {
      credentials: 'include',
      mode: "cors",
      headers: this.GetHeaders(),
      method: method,


    };

    // if (this.enableCors) {
    //
    //   fetchOptions.mode = "cors"
    // }
    //console.log(fetchOptions, "CORS enabled?")
    if (body !== null) {
      fetchOptions.body = JSON.stringify(body)
    }

    let finalUrl = `${this.baseUrl}/${url}`;
    if (this.baseUrl.endsWith('/')) {
      finalUrl = `${this.baseUrl}/${url}`;
    }

    if (url.startsWith('?')) {
      finalUrl = `${this.baseUrl}${url}`
    }

    return fetch(finalUrl, fetchOptions)
      .then(async response => {

        if (!response.ok) {

          let json = { message: "Unknown Error"};
          try {
            json = await response.json();
          }
          catch (e) {

          }

          throw new HttpError(response.status, json.message, finalUrl);
        }
        let result = {}
        try {
          result = await response.json();
        }
        catch (e) {}
        return result;
      })
//       .catch(reason => {
// alert(reason)
//             handleError(reason)
//
//         }
//       )
      .catch((err) => {
       handleError(this.vueInstance, err);
       throw err;
      })
  }

  GetToken() {
    let token = localStorage.getItem(process.env.VUE_APP_OIDC_SESSION_STORAGE_KEY);
    return JSON.parse(token);
  }

  GetHeaders() {
    let offset = new Date().getTimezoneOffset() * -1; // javascript reports offsets to UTC with the wrong sign
    let headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "MyBucks-Context": this.vueInstance.$store.state.appContext,
      "MyBucks-TimeZone": offset,
      "Thorium-Context": this.vueInstance.$store.state.appContext,
      "Thorium-TimeZone": offset
    };
    //let user = store.getters.user;

    /*if (user) {
      headers['MyBucks-UserId'] = user.sub;
    }*/
    let token = this.GetToken();
    if (token) {
      headers.Authorization = `Bearer ${token.access_token}`;
    }
    return headers;
  }

  Get(url, onFailed) {
    return this.UiFetch(url, "GET")
  }

  Download(url, filename, onFailed) {
    return fetch(`${this.baseUrl}/${url}`, {
      mode: "cors",
      credentials: 'include',
      headers: this.GetHeaders(),
      method: "GET",

    })
      .then(async response => {

        if (!response.ok) {
          let json = await response.json();
          throw new HttpError(response.status, json.message);
        }
        return response.blob()
      })
      .catch(reason => {
          throw reason;
          if (onFailed) {
            throw Error("sfsd")
          }
        }
      )
      .then(function(blob) {
        download(blob, filename);
      });
  }

  Upload(url, file, onFailed) {
    let data = new FormData();
    data.append('file', file);

    let uploadHeaders =  this.GetHeaders();
    delete  uploadHeaders["Content-Type"];
    return fetch(`${this.baseUrl}/${url}`, {
      credentials: 'include',
      mode: "cors",
      headers: uploadHeaders,
      method: "POST",

      body: data
    })
      .then(async response => {

        if (!response.ok) {
          let json = await response.json();
          throw new HttpError(response.status, json.message);
        }
        return response.json()
      })
      .catch(reason => {
        throw reason;
          if (onFailed) {
            onFailed(reason)
          }
        }
      )
  }

  Delete(url) {
    return this.UiFetch(url, "DELETE")
  }

  Post(url, postData) {
    return this.UiFetch(url, "POST", postData)
  }

  Put(url, postData) {
    return this.UiFetch(url, "PUT", postData)
  }

  Patch(url, patchData) {
    return this.UiFetch(url, "PATCH", patchData)
  }
}