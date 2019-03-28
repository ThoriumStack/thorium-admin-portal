<template>
    <div class="ui field" >
        <div v-if="!isMobile()" class="ui dropdown selection desktop" :class="{disabled: disabled, loading: loading == true}"
             :id="`drop_${dropDownId}`">

            <input type="hidden" ref="input" :name="`drop_${dropDownId}`" :value="value">
            <div class="default text">{{ currentPlaceHolder }}</div>
            <i @click="toggleDropDownVisibility" class="dropdown icon"></i>

            <div class="menu">
                <div class="ui item" v-for="option in options" v-bind:data-value="option['idProperty'] || option.id">
                    {{ getDescription(option) }}
                </div>
            </div>
        </div>
        <div v-if="isMobile()" class="ui field mobile">

            <div class="ui dropdown selection " @click="dimmerPopup()" :id="`drop_${dropDownId}`">

                <input type="hidden" ref="input" :name="`drop_${dropDownId}`" :value="value">
                <div @click="dimmerPopup()" v-if="!currentDescription" class="default text">{{ currentPlaceHolder }}</div>
                <div @click="dimmerPopup()" v-else class="text">{{ currentDescription }}</div>
                <i @click="dimmerPopup()" class="dropdown icon"></i>

                <div @click="dimmerPopup()" class="menu">

                </div>
            </div>
            <div  class="ui  page dimmer">
                <div class=" content  " style="overflow: auto" >

                    <div class="ui vertical menu" >
                        <a class="item" @click="selectItem(option)" v-for="option in options"
                           v-bind:data-value="option['idProperty'] || option.id">
                            {{ getDescription(option) }}
                        </a>
                    </div>

                </div>
            </div>
        </div>

    </div>

</template>

<script>
  import * as numeral from 'numeral'
  import TextField from "@/components/common/form-components/TextField";

  export default {
    components: {TextField},
    data: function () {
      return {
        selected: {},
        currentDescription: null,
        currentPlaceHolder: "Please select"
      }
    },
    watch: {
      options() {
        let el = this.getDropDownElement();
        this.$nextTick(function () {
          this.getDropDownElement().dropdown('refresh');
        });
      },
      value: function () {
        if (this.isMobile())
        {
          this.$nextTick(function () {
            this.setMobileDropDownValue();
          });
          //
          return;
        }
        let el = this.getDropDownElement();
        this.$nextTick(function () {

          if (this.value == null) {
            el.dropdown('clear')
            return;
          }
          el.dropdown('refresh');

          el.dropdown('set selected', this.value);
          el.dropdown('refresh');

        });
        el.dropdown('refresh');
        el.dropdown('set selected', this.value);
        el.dropdown('refresh');
      },
      selected: function () {
        //
      },
      currentPlaceHolder: function () {
        let el = this.getDropDownElement();
        el
          .dropdown('restore placeholder text');
      }
    },

    computed: {
      descriptionValues() {

      },

    },
    props: [
      "options", //[{text, value}]
      "dropDownId",
      "placeHolder",
      "disabled",
      "value",
      "idProperty",
      "descriptionProperty",
      "dataType",
      "translate",
      "loading"
    ],
    methods: {
      selectItem(item) {
        let el = this.getDropDownElement();
        this.currentDescription = this.getDescription(item)
       // el.dropdown('set selected', item.id)
        //el.dropdown('refresh')
        this.selected = item;
        this.getDimmerElement()
          .dimmer('hide')
        ;

        this.$emit('input', this.getValue());
      },
      isMobile() {
        let result = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent));

        return result;

      },
      getDropDownElement() {
        return $(this.$el).find('.desktop')
      },
      getDimmerElement() {
        return $(this.$el).find('.dimmer')
      },
      toggleDropDownVisibility() {

      },
      dimmerPopup() {
        this.getDimmerElement()
          .dimmer('show')
        ;
      },
      getDescription(item) {
        let rawValue = _.get(item, this.descriptionProperty) || item.description;
        if (this.dataType && this.dataType == 'amount') {
          return numeral(rawValue).format();
        }
        if (this.translate) {
          return this.$t(rawValue);
        }
        return rawValue;
      },
      getValue() {
        return this.selected[this.idProperty] || this.selected.id;
      },
      getPlaceHolder() {
        return this.placeHolder || this.$t("please_select");
      },
      getDescriptionProperty() {
        return this.descriptionProperty || 'description';
      },
      getIdProperty() {
        return this.idProperty || 'id';
      },
      setMobileDropDownValue() {
        if (this.value && this.options) {

          let found = this.options.filter(item => item[this.getIdProperty()] == this.value)

          if (found && found.length > 0) {
            this.selected = {

            };

            this.selected[this.getDescriptionProperty()] = found[0][this.getDescriptionProperty()]
            this.selected[this.getIdProperty()] = found[0][this.getIdProperty()]

            this.currentDescription = this.getDescription(this.selected)
          }
        }
      }

    },
    created() {
      this.currentPlaceHolder = this.getPlaceHolder();
    },
    mounted() {
      let vm = this;

      if (this.isMobile())
      {
        this.setMobileDropDownValue();
        return;
      }
      this.$nextTick(function () {
        let el = this.getDropDownElement();
        el
          .dropdown({
            showOnFocus: false
          })
          .dropdown('refresh')
          .dropdown('setting', 'onChange', (value) => {

            if (value == null || !value) {
              // $(vm.$el).dropdown('clear')
            }
            //

            vm.$emit('input', value);
          });


      })

    }
  }
</script>
<style scoped>
    /*@media screen and(max-width: 480px) {*/
        /*.desktop {*/
            /*display: none;*/
        /*}*/

        /*.mobile {*/
            /*display: block;*/
        /*}*/
    /*}*/

    /*@media screen and(min-width: 480px) {*/
    /*.desktop {*/
    /*display: block;*/
    /*}*/
    /*.mobile {*/
    /*display: none;*/
    /*}*/
    /*}*/
</style>