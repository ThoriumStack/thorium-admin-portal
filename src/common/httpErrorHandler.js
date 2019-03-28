function showMessage(vueInstance, title, message) {
  //vueInstance.$dialog(title, message)
 // vueInstance.$toastr('error', message, title)
  vueInstance.$toastr('add', {
    title: title, // Toast Title
    msg: message, // Message
    timeout: 5000, // Timeout in ms
    position: 'toast-bottom-full-width', // Toastr position
    type: 'error', // Toastr type
    closeOnHover: false, // On mouse over stop timeout can be boolean; default true
    clickClose: true, // On click toast close can be boolean; default false
    // Available callbacks
    onClicked: () => vueInstance.$dialog(title, message),

  })

}

export default function handleError(vueInstance, err) {

  if (!vueInstance) {
    alert(err.message);
    return;
  }
  if (err.statusCode === 400) {
    showMessage(vueInstance, "Invalid Request", err.message)
  }
  else if (err.statusCode === 404) {
    showMessage(vueInstance, "Not Found", err.message)
  }
  else if (err.statusCode === 503) {
    showMessage(vueInstance, "Service Unavailable", err.message)
  }
  else if (err.statusCode === 403) {
    showMessage(vueInstance, "Permission Denied", err.url)
  }
  else if (err.statusCode === 401) {
    if (!document.unauthorizedMessage) {
      document.unauthorizedMessage = true;
      showMessage(vueInstance, "Authentication Error", err.message)
    }
  }
  else if (err.statusCode === 500) {
    showMessage(vueInstance, "Server Error", err.message)
  }
  else {
    showMessage(vueInstance, "Unknown Error!", `Something went very wrong. This is all the info we have: ${err.message} (code: ${err.statusCode})`)
  }

}