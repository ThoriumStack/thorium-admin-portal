<template>
    <div id="table-container" class="dimmable">

        <div class="ui inverted dimmer" :class="{active: tableLoading}">
            <div class="ui loader"></div>
        </div>
        <table v-if="value && value.length > 0 && !isMobile()" :class="{sortable: sortable}" class="ui  wide small striped table ">
            <thead>
            <tr>
                <th :class="column.style"  @click="setSortOrder(column)" v-for="column in columnSetup">{{$t(column.description)}}</th>
                <th v-if="actions" class="collapsing"></th>
            </tr>
            </thead>
            <!--<transition-group name="fade" tag="tbody" >-->
            <tbody>
            <tr v-for="row in value">

                <td :class="column.style" v-for="column in columnSetup">
                    <p :class="setCellClass(row, column)" v-if="!column.type"> {{ getColumnValue(row, column) }} </p>
                    <!--<p v-if="!column.type"> {{ row[column.path] }} </p>-->
                    <div v-if="column.type === 'checkBox'" class="ui checkbox read-only">
                        <input readonly="readonly" type="checkbox" v-model="row[column.path]"
                               :title="column.description">
                        <label></label>
                    </div>
                    <div v-if="column.type === 'textBox'">
                        <input :title="column.description" type="text" v-model="row[column.path]">
                    </div>
                </td>
                <td v-if="actions">
                    <div class="ui buttons">
                        <button
                                v-bind:id="`tbtn_${action.action}`"
                                data-position="right center" :data-tooltip="action.tooltip" v-for="action in actions"
                                :class="actionClass(action)"
                                @click.prevent="$emit(action.action, row)" type="button"
                                class="ui tiny right floated icon button ">

                            <i v-if="action.icon" :class="action.icon" class="icon"></i>
                            <label v-if="action.description && action.description.length > 0">
                                {{action.description}}</label>
                        </button>
                    </div>
                </td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <th v-bind:colspan="columnSetup.length + 1">
                    <slot name="footer"></slot>
                </th>
            </tr>
            </tfoot>
            <!--</transition-group>-->
        </table>
        <div style="width: 100%" v-else-if="value && value.length > 0 && isMobile()" >
            <div class="ui flex card " style="width: auto" v-for="row in value">

                <div class="ui content"  v-for="column in columnSetup">
                    <div class="item">
                    <h5 class="ui sub header">{{$t(column.description)}}:</h5>
                        <span :class="column.style" v-if="!column.type"> {{ getColumnValue(row, column) }} </span>
                    <!--<p v-if="!column.type"> {{ row[column.path] }} </p>-->
                    <div v-if="column.type === 'checkBox'" class="ui checkbox read-only">
                        <input readonly="readonly" type="checkbox" v-model="row[column.path]"
                               :title="column.description">
                        <label></label>
                    </div>
                    <div v-if="column.type === 'textBox'">
                        <input :title="column.description" type="text" v-model="row[column.path]">
                    </div>
                    </div>
                </div>

                <div class="ui shaded center aligned extra content" v-if="actions">
                    <div class="ui  buttons  ">
                        <button
                                v-bind:id="`tbtn_${action.action}`"
                                :data-tooltip="action.tooltip"
                                 v-for="action in actions"
                                 @click.prevent="$emit(action.action, row)"
                                 type="button"
                                 :class="actionClass(action)"
                                class="ui fluid icon button ">


                            <i v-if="action.icon" :class="action.icon" class="icon"></i>
                            <label v-if="action.description && action.description.length > 0">
                                {{action.description}}</label>
                        </button>
                    </div>
                </div>
            </div>
            <slot name="footer"></slot>
        </div>
        <div v-else class="ui message">
            <p>{{$t('no_results_found')}}</p>
        </div>
    </div>
</template>

<script>
  import _ from 'lodash';
  import * as numeral from "numeral";
  import * as dt from "@/common/dateTimeHandler"

  export default {
    name: "VueTable",
    data: function () {
      return {
        columnData: this.columnSetup,
        tableLoading: false
      }
    },

    methods: {
      isMobile() {
        let result = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent));

        return result;

      },
      setCellClass(row, column) {
        if (column.cellClass) {
          if (column.cellClass.constructor === Array) {
            return column.cellClass;
          }

          return column.cellClass(row)
        }
      },
      getColumnValue(row, column) {
        let rawValue = _.get(row, column.path);

        if (!rawValue) {
          console.warn(`column not found: ${column.path}`)
        }

        if (column.lookUp) {
          return column.lookUp(rawValue);
        }

        if (column.dataType === 'amount') {
          console.log(rawValue);
          return numeral(rawValue).format()
        }

        if (column.dataType === 'date') {
          if (column.customFormat) {
            let momentTime = this.$moment(rawValue).local();
            return momentTime.format(column.customFormat)
          }

          return dt.dateToString(rawValue);
        }
        if (column.dataType === 'datetime') {

          return dt.dateTimeToLocalString(rawValue);
        }
        if (column.translate) {
          return this.$t(rawValue)
        }
        return rawValue
      },
      actionClass(action) {
        if (action.class) {
          let actionClass = `${action.class}`;
          let classObj = {};
          classObj[actionClass] = true;
          return classObj;

        }
        return {primary: true}
      },
      getColumnStyle(column) {
        let classObj = {
          'center aligned': column.type === 'checkBox',
          'collapsing': column.type === 'checkBox' || column.dataType === 'amount',
          'right aligned': column.dataType === 'amount'
        };
        if (column.cellClass) {
          console.log(column.cellClass);

          classObj[column.cellClass] = true
        }
        if (!column.sortable) {
          classObj['no-sort'] = true;
          return classObj;
        }
        if (column.sortOrder) {
          this.unsortOtherColumns(column);
          classObj['sorted'] = true;
          if (column.sortOrder === 'asc') {
            classObj['ascending'] = true
          }
          if (column.sortOrder === 'desc') {
            classObj['descending'] = true
          }

        }
        return classObj;
      },
      unsortOtherColumns(column) {
        let otherColumns = this.columnSetup.filter((_) => _.path !== column.path);
        for (let col of otherColumns) {
          col.sortOrder = null;
          col.style["sorted"] = false;
          col.style["ascending"] = false;
          col.style["descending"] = false;
        }
      },
      setSortOrder(column) {
        if (!column.sortable) {
          return;
        }
        if (!column.sortOrder) {
          column.sortOrder = 'asc'
        }
        else if( column.sortOrder === 'asc') {
          column.sortOrder = 'desc'
        }
        else {
          column.sortOrder = 'asc'
        }

        this.$set(column, 'style', this.getColumnStyle(column))
        this.$emit('sort', column)
      }

    },
    computed: {},
    watch : {
      isLoading: function(val) {
          let vm = this;


          vm.tableLoading = val;

        },

    },
    props: {
      columnSetup: Array,
      value: Array,
      actions: Array,
      isLoading: Boolean,
      sortable: Boolean

    },
    mounted() {
      for (let column of this.columnSetup) {
       // column.style = this.getColumnStyle(column)
        this.$set(column, 'style', this.getColumnStyle(column))
      }
    }
  }
</script>

<style scoped>
.shaded {
    background-color: #f3f3f3 !important;
}
.label.status {
    text-align: center;
    display: block;
}
</style>