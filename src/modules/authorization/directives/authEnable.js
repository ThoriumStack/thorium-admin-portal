import store from '@/store/store';

export default {
  inserted: function (el, binding) {

    let enable = () => {
      if ($.inArray(binding.arg, store.getters.authDetails) !== -1) {
        $(el).css("pointer-events", "");
        //console.log("enable")
        try {
          $(el).enable();
        }
        catch (e) {

        }
        return;
      }
      $(el).css("pointer-events", "none");

      try {
        $(el).disable();
      }
      catch (e) {

      }
    }

    enable();

    store.watch(
      function (state) {
        return state.authDetails;
      },
      function () {
        enable()
      },
      {
        deep: true //add this if u need to watch object properties change etc.
      });




  }
}