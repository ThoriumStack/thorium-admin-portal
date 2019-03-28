
import ErrorDialog from '../components/common/ErrorDialog'
import ConfirmationDialog from '../components/common/ConfirmationDialog'
const Dialog = {
  install (Vue, options) {
    // creates a instance method that can be used inside of a Vue component
    Vue.prototype.$dialog = function (title, message) {

      var ComponentClass = Vue.extend(ErrorDialog);
      var instance = new ComponentClass();
      instance.$mount(); // pass nothing
      document.body.appendChild(instance.$el);
      // this.$refs.container.appendChild(instance.$el)
      instance.show(title, message);
    }

    Vue.prototype.$confirm = function (title, message, acceptButtonText, rejectButtonText, onAccept, onReject) {

      let ComponentClass = Vue.extend(ConfirmationDialog);
      let instance = new ComponentClass();


      instance.$mount(); // pass nothing
      document.body.appendChild(instance.$el);
      // this.$refs.container.appendChild(instance.$el)
      instance.show(title, message, acceptButtonText, rejectButtonText, onAccept, onReject);
    }
  }
}

export default Dialog