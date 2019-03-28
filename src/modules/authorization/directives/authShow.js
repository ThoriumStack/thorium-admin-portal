import store from '@/store/store';

export default {
  inserted: function (el, binding) {

    let hide = () => {

      if ($.inArray(binding.arg, store.getters.authDetails) !== -1) {
        $(el).show();
        return;
      }

      $(el).hide();
    }

    store.watch(
      function (state) {
        return state.authDetails;
      },
      function () {
        hide()
      },
      {
        deep: true //add this if u need to watch object properties change etc.
      });

      hide();


  }
}