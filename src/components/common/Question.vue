<template>
    <div class="ui  segment">
        <div class="">{{$t(questionText)}}</div>
        <div class="ui divider"></div>
        <!--<div v-if="questionType === 'yesno'">-->
            <!--<button @click.prevent="yesAction" class="ui positive button">{{$t('yes')}}</button>-->
            <!--<button @click.prevent="noAction" class="ui negative button">{{$t('no')}}</button>-->
        <!--</div>-->
        <div v-if="questionType === 'single-select'" class="ui form">
            <div class="grouped fields">

                <div v-for="option in options" class="field">
                    <div class="ui radio checkbox">
                        <input type="radio" v-bind:name="optionSetKey" v-model="chosenOption" v-bind:value="option.value"
                               checked="checked">
                        <label>{{$t(option.label)}}</label>
                    </div>
                </div>

                <div v-if="allowOther">
                    <div class="field">
                        <div class="ui radio checkbox">
                            <input type="radio" v-bind:name="optionSetKey" v-model="chosenOption" value="show_other"
                                   checked="checked">
                            <label>{{$t('other')}}</label>
                        </div>
                    </div>
                    <text-field v-if="chosenOption === 'show_other'" v-model="otherText" label="other"></text-field>
                </div>
            </div>

            <button @click.prevent="submitSingleSelect" class="ui primary button">{{$t('save')}}</button>
        </div>
        <div v-if="showErrors" class="ui error message">
            {{$t('you_must_answer_this_question')}}
        </div>
        <slot></slot>
    </div>
</template>

<script>
  import TextField from "@/components/common/form-components/TextField";

  export default {
    name: "Question",
    components: {TextField},
    props: {
      options: {
        type: Array,
        required: false
      },
      questionText: {
        type: String,
        required: true
      },
      allowOther: {
        type: Boolean,
        required: false
      },
      questionType: {
        validator: function (value) {
          // The value must match one of these strings
          console.log(value)
          return ['text', 'single-select', 'multiselect'].indexOf(value) !== -1
        }
      }
    },
    data: function () {
      return {
        chosenOption: null,
        otherText: null,
        showErrors: false,
        errorMessages: [],
        optionSetKey: '',
        answerValue: null
      }
    },
    watch: {

    },
    methods: {
      uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      },
      yesAction() {
        this.answered(true);
      },
      noAction() {
        this.answered(false);
      },
      answered(value) {
        this.$emit('answered', value)

      },
      submitSingleSelect() {
        let vm = this;
        vm.showErrors = false;
        if (vm.chosenOption === 'show_other' && (!vm.otherText || vm.otherText.length === 0)) {
          vm.showErrors = true;
          return;
        }

        if (vm.chosenOption === 'show_other') {
          vm.answered(vm.otherText)
          return;
        }

        if (vm.chosenOption === null) {
          vm.showErrors = true;
          return;
        }
        vm.answered(vm.chosenOption)


      },
      mounted() {
        this.optionSetKey = this.uuidv4();
      }
    }
  }
</script>

<style scoped>

</style>