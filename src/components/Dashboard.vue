<template>
    <div class="ui very basic segment">

        <h2 v-if="themes[$store.state.appContext]" class="ui center aligned icon header">
            <img class="ui massive circular image" v-bind:src="themes[$store.state.appContext].logo">
            <h1>{{$t('welcome', {appName: themes[$store.state.appContext].appName})}}</h1>
            <div class="ui divider"></div>
        </h2>



    </div>
</template>

<script>
  import VueModal from "./common/VueModal";
  import VueDatePicker from "./common/VueDatePicker";
  import VueDropDown from "./common/VueDropDown";

  import PdfDocument from "@/components/common/PdfDocument";
  import VueTable from "@/components/common/VueTable";
  import themes from '@/common/themeSetup'

  import Question from "@/components/common/Question";


  export default {
    name: "Dashboard",
    components: {

      Question,

      VueTable,
      PdfDocument,

      VueDatePicker,
      VueModal,
      VueDropDown
    },
    data: function () {
      return {
        themes: {},
        message: 'nothing',
        selectedDate: null,
        dropDownOptions: [
          {text: 'One', id: 'A'},
          {text: 'Two', id: 'B'},
          {text: 'Three', id: 'C'}
        ],
        dropDownSelectedValue: '3',
        tbData: [],
        isTableLoading: false
      }

    },
    destroyed: function () {

    },

    methods: {

      sort(col) {
        this.loadData()
      },
      loadData() {
        let vm = this;
        vm.isTableLoading = true;
        setTimeout(() => {
          vm.isTableLoading = false;
          vm.tbData = [
            {test: '23232', test2: 'hello'},
            {test: '123123', test2: 'asdasd'},
            {test: '789789', test2: 'fdsgd'},
          ]
        }, 2000)
      },


      close: function () {
        $('#testDialog')
          .modal('hide');
      },

    },
    mounted() {
      this.themes = themes;
      this.loadData()
    }
  }
</script>

<style scoped>

</style>