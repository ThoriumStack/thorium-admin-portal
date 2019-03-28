const baseUrl = process.env.VUE_APP_BASE_URL;
const serviceSettings =
  {
    "AuthorizationAdminClient": "/authorization",
    "AuthClient": "/auth",
    "UsersClient": "/users",
  };


export default function (serviceKey) {
  return `${baseUrl}${serviceSettings[serviceKey]}`;
}



