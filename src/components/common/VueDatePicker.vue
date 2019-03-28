<template>
    <div class="ui calendar">
        <div class="ui input left icon">
            <i class="calendar icon"></i>
            <input @keyup.esc="hidePopup" v-bind:id="inputId" @keyup.ctrl.space="showPopup"
                   @keyup.ctrl.37="selectPreviousMode" @keyup.ctrl.39="selectNextMode" v-model="selectedDate"
                   type="text" :placeholder="$t('date_time')">
        </div>
    </div>
</template>

<script>
  //import 'semantic-ui-calendar/dist/calendar'
  import * as moment from 'moment'

  export default {
    name: "VueDatePicker",
    props: ["value", "format", "minDate", "maxDate", "inputId"],
    data: function () {
      return {
        selectedDate: null,
        dateVal: null,
        input: null,
        calendar: null
      }
    },
    methods: {
      valueChange: function (newDate) {
        this.dateVal = newDate

      },
      getLetterDays() {
        let vm = this;


        return [vm.$t('day_letter_sunday'), vm.$t('day_letter_monday'), vm.$t('day_letter_tuesday'), vm.$t('day_letter_wednesday'), vm.$t('day_letter_thursday'), vm.$t('day_letter_friday'), vm.$t('day_letter_saturday')];
      },
      hidePopup() {
        $(this.$el).calendar('popup', 'hide')
        $(this.$el).calendar('focus')

      },
      showPopup() {
        $(this.$el).calendar('popup', 'show')
      },
      selectNextMode() {
        const modes = ['year', 'month', 'day'];
        const currentMode = $(this.$el).calendar('get mode');
        const currentModeIndex = modes.indexOf(currentMode);
        if (currentModeIndex == 2) {
          return;
        }

        const nextMode = modes[currentModeIndex + 1];
        $(this.$el).calendar('set mode', nextMode)
      },
      selectPreviousMode() {
        const modes = ['year', 'month', 'day'];
        const currentMode = $(this.$el).calendar('get mode');
        const currentModeIndex = modes.indexOf(currentMode);
        if (currentModeIndex == 0) {
          return;
        }

        const nextMode = modes[currentModeIndex - 1];
        $(this.$el).calendar('set mode', nextMode)
      },
      getDateFormat() {
        this.$moment.locale(this.$store.getters.locale);
        let localeData = this.$moment.localeData();
        let format = localeData.longDateFormat('L');
        return format;
      },
      getDateTimeFormat() {
        this.$moment.locale(this.$store.getters.locale);
        let localeData = this.$moment.localeData();
        let format = localeData.longDateFormat('L') + ' ' + localeData.longDateFormat('LT');
        return format;
      },
      getTimeFormat() {
        this.$moment.locale(this.$store.getters.locale);
        let localeData = this.$moment.localeData();
        let format = localeData.longDateFormat('LT');
        return format;
      }
    },
    watch: {
      selectedDate() {
      },
      dateVal: function (newVal, oldVal) {

        if (newVal == null) {
          this.$emit('input', null);
          return;
        }


        let momentTime = this.$moment(newVal);

        this.$emit('input', newVal);
      },
      value: function (newVal, oldVal) {

        let vm = this;
        if (!newVal) {
          return;
        }
        if (newVal != oldVal) {


          if (!newVal  || newVal == null) {
            console.log('clearing calendar')
          //  this.$nextTick(() => {
              $(this.$el).calendar('clear')
              this.dateVal = null;
         //   });
            return;
          }
           let dateVal = moment(moment(newVal));
         // this.$nextTick(() => {

            if (newVal) {
             // console.log('updating calendar', newVal)
              $(this.$el).calendar('set date', dateVal.toDate(), true, false)
            }
       //   });
         //  if (newVal) {
         //    $(this.$el).calendar('set date', newVal, true, false)
         //  }
        }
      }
    },
    mounted() {
      let vm = this;
      this.input = this.$el;
      this.$nextTick(() => {
        vm.calendar = $(vm.input).calendar({

          minDate: vm.minDate || null,
          maxDate: vm.maxDate || null,

          text: {
            days: vm.getLetterDays(),
            months: [vm.$t('january'), vm.$t('february'), vm.$t('march'), vm.$t('april'), vm.$t('may'), vm.$t('june'), vm.$t('july'), vm.$t('august'), vm.$t('september'), vm.$t('october'), vm.$t('november'), vm.$t('december')],
            monthsShort: [
              vm.$t('month_short_jan'),
              vm.$t('month_short_feb'),
              vm.$t('month_short_mar'),
              vm.$t('month_short_apr'),
              vm.$t('month_short_may'),
              vm.$t('month_short_jun'),
              vm.$t('month_short_jul'),
              vm.$t('month_short_aug'),
              vm.$t('month_short_sep'),
              vm.$t('month_short_oct'),
              vm.$t('month_short_nov'),
              vm.$t('month_short_dec')],
            today: vm.$t('today'),
            now: vm.$t('now'),
            am: vm.$t('am'),
            pm: vm.$t('pm')
          },
          parser: {
            date: function (text, settings) {

              let dateFormat = vm.getDateFormat();

              let date = vm.$moment(text, dateFormat, true);
              if (date.isValid()) {
                return date.toDate();
              }

                // date = vm.$moment(text);
                // return date.toDate();

              //return vm.$moment().toDate();
             // return null;

            }
          },
          formatter: {
            datetime: function (date, settings) {
              if (date == null) {
                return '';
              }
              let momentTime = vm.$moment(date);
              return momentTime.format(vm.getDateFormat());
            },
            date: function (date, settings) {
              if (date == null) {
                return '';
              }
              let momentTime = vm.$moment(date);
              return momentTime.format(vm.getDateFormat());
            },
            time: function (date, settings, forCalendar) {
              if (date == null) {
                return '';
              }
              let momentTime = vm.$moment(date);

              return momentTime.format(vm.getTimeFormat());
            },
          },
          popupOptions: {
            observeChanges: false,
            position: 'bottom left',
            prefer: 'adjacent',
            lastResort: 'top left'
          },
          type: 'date',
          onChange: (date) => {

            vm.valueChange(date)
          }
        });
      });

    }
  }
</script>

<style scoped>

</style>