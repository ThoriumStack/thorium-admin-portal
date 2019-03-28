const baseUrl = process.env.VUE_APP_BASE_URL;
const serviceSettings =
  {
    "ContactDetailClient": "/contact-details"
  };


export default function (serviceKey) {
  return `${baseUrl}${serviceSettings[serviceKey]}`;
}



