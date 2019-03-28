export class AuthClient {


  constructor() {
    new Oidc.UserManager({
      userStore: new Oidc.WebStorageStateStore(),
      authority: process.env.VUE_APP_OIDC_AUTHORITY,
      client_id: process.env.VUE_APP_OIDC_CLIENT_ID,
      redirect_uri: process.env.VUE_APP_OIDC_REDIRECT_URI,
      response_type: process.env.VUE_APP_OIDC_RESPONSE_TYPE,
      scope: process.env.VUE_APP_OIDC_SCOPE,
      post_logout_redirect_uri: process.env.VUE_APP_OIDC_POST_LOGOUT_REDIRECT_URI,
      loadUserInfo: true
    });

  }

 signIn() {
  this.mgr.signinRedirect(
    {
      extraQueryParams: { //your params go here
        context: process.env.VUE_APP_CONTEXT
      },
    }
  )
    .catch(function (err) {
    console.log(err)
  })
}
}