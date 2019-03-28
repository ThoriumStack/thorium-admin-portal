import Oidc from 'oidc-client';

var mgr = new Oidc.UserManager({
  userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
  authority: process.env.VUE_APP_OIDC_AUTHORITY,
  client_id: process.env.VUE_APP_OIDC_CLIENT_ID,
  redirect_uri: process.env.VUE_APP_OIDC_REDIRECT_URI,
  response_type: process.env.VUE_APP_OIDC_RESPONSE_TYPE,
  scope: process.env.VUE_APP_OIDC_SCOPE,
  post_logout_redirect_uri: process.env.VUE_APP_OIDC_POST_LOGOUT_REDIRECT_URI,
  loadUserInfo: true
})

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

mgr.events.addUserLoaded(function (user) {


});

mgr.events.addAccessTokenExpiring(function () {
  //console.log('AccessToken Expiring：', arguments);
});

mgr.events.addAccessTokenExpired(function () {
  // alert('Session expired. Going out!');
  // mgr.signoutRedirect().then(function (resp) {
  //   console.log('signed out', resp);
  // }).catch(function (err) {
  //   console.log(err)
  // })
});

mgr.events.addSilentRenewError(function () {
  console.error('Silent Renew Error：', arguments);
});

mgr.events.addUserSignedOut(function () {
  //alert('Going out!');
  //mgr.removeUser();
  mgr.signinRedirect().then(function (resp) {
    console.log('signed out, redirecting to sign in', resp);
  }).catch(function (err) {
    console.log(err)
  })

  // mgr.signoutRedirect().then(function (resp) {
  //   console.log('signed out, redirecting to sign in', resp);
  // }).catch(function (err) {
  //   console.log(err)
  // })
});

export default class SecurityService {

  constructor(){
  }

  getUser () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else{

          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }
  getSignedIn () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{
          return resolve(true)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }
  signIn () {
    mgr.signinRedirect( {
      extraQueryParams: { //your params go here
        context: process.env.VUE_APP_CONTEXT,

      },
    }).catch(function (err) {
      console.log(err)
    })
  }
  signOut () {
    var self = this;
    mgr.signoutRedirect().then(function (resp) {
      console.log('signed out', resp);
    }).catch(function (err) {
      console.log(err)
    })
  }

  getToken () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  getProfile () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{
          return resolve(user.profile)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  getIdToken(){
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{
          return resolve(user.id_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  getSessionState(){
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{
          return resolve(user.session_state)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  getAcessToken(){
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{
          return resolve(user.access_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  getScopes(){
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{
          return resolve(user.scopes)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }

  getRole () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else{
          return resolve(user.profile.role)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      });
    })
  }
}