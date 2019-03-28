<template>
    <page title="contact_detail" :translate="true" icon="user" :is-loading="isLoading">
        <vue-table
                :column-setup="columnSetup"
                :actions="actions"
                @showInfo="showInfoModal"
                @deleteContact="deleteContact"
                @openEditContact="openEditContact"
                v-model="contacts"
        >
        </vue-table>

  <button class="ui primary icon button" @click.prevent="openAddContact"><i class="plus icon"></i>{{$t('add')}} </button>


        <vue-modal ref="addEditModal">
            <template slot="header">{{$t('add_edit_contact')}}</template>
            <template slot="content">
                <form class="ui form">
                    <text-field label="name" v-model="editContact.firstName"></text-field>
                    <text-field label="surname" v-model="editContact.lastName"></text-field>
                    <text-field label="email" v-model="editContact.email"></text-field>
                    <!-- add dateOfBirth here -->
                    <div class="field">
                        <label>{{$t('date_of_birth')}}</label>
                        <vue-date-picker
                                :max-date="new Date()"
                                v-model="editContact.dateOfBirth"
                        ></vue-date-picker>
                    </div>

                    <div class="ui segment">
                        <h4>{{$t('contact_numbers')}}</h4>
                        <div class="ui divider"></div>
                        <div v-for="contactNumber in editContact.contactNumbers" class="ui inverted two column segment">
                            <div class="ui column">
                                <div>{{$t('number_type')}}: {{$t(contactNumber.numberType)}}</div>
                                <div>{{contactNumber.number}}</div>
                            </div>
                            <div class="ui column">
                                <button @click.prevent="removeContactNumber(contactNumber)" class="ui negative button"><i
                                        class="trash icon"></i> {{$t('delete')}}
                                </button>
                            </div>
                        </div>
                        <!--<text-field label="number_type" v-model="newContactNumber.numberType"></text-field>-->
                        <vue-drop-down v-model="newContactNumber.numberType" :translate="true" :options="numberTypes"></vue-drop-down>
                        <text-field label="number" v-model="newContactNumber.number"></text-field>

                        <button @click.prevent="addContactNumber" class="ui positive icon button"><i class="plus icon"></i>
                        </button>
                    </div>


                </form>
            </template>
            <template slot="actions">
                <button v-if="editContact.id" @click.prevent="saveContact" class="ui primary button">{{$t('save')}}</button>
                <button v-else @click.prevent="addContact" class="ui primary button">{{$t('save')}}</button>

            </template>
        </vue-modal>

        <vue-modal ref="contactNumbersModal">
            <template slot="header">{{$t('contact_numbers')}}</template>
            <template slot="content">
                <div v-if="currentContact.contactNumbers">
                    <div v-for="contactNum in currentContact.contactNumbers" class="ui segment">
                        <h3>{{$t(contactNum.numberType)}}</h3>
                        <div class="ui label">{{contactNum.number}}</div>
                    </div>
                    <vue-table :column-setup="contactNumberColumns" v-model="currentContact.contactNumbers"></vue-table>
                </div>


            </template>
            <template slot="actions">
                <button class="ui positive button">{{$t('ok')}}</button>
            </template>
        </vue-modal>


    </page>
</template>

<script>
  import Page from "@/components/common/Page";
  import VueTable from "@/components/common/VueTable";
  import {ContactDetailClient} from "../api/v1_0/ContactDetailClient_v1_0";
  import TextField from "@/components/common/form-components/TextField";
  import VueModal from "@/components/common/VueModal";
  import VueDropDown from "@/components/common/VueDropDown";
  import VueDatePicker from "@/components/common/VueDatePicker";

  export default {
    name: "ContactDetails",
    components: {VueDatePicker, VueDropDown, VueModal, TextField, VueTable, Page},
    data: function () {
      return {
        isLoading: false,
        columnSetup: [
          {description: 'name', path: 'firstName'},
          {description: 'surname', path: 'lastName'},
          {description: 'email', path: 'email'},
          {description: 'dateOfBirth', path: 'dateOfBirth', dataType: 'date'},
        ],
        actions: [
          {icon: 'info', action: 'showInfo'},
          {icon: 'edit', action: 'openEditContact'},
          {icon: 'trash', action: 'deleteContact', class: 'negative '},

        ],
        contactNumberColumns: [
          {description: 'number_type', path: 'numberType'},
          {description: 'number', path: 'number'},
        ],
        contacts: [],
        editContact: {
          contactNumbers: []
        },
        newContactNumber: {},
        currentContact: {},
        numberTypes: [
          {description: 'home', id: 'home'},
          {description: 'work', id: 'work'},
          {description: 'mobile', id: 'mobile'},
        ]
      }
    },
    methods: {
      openAddContact() {
        this.editContact =  {
          contactNumbers: []
        };
        this.$refs.addEditModal.show();
      },
      saveContact() {
        let vm = this;
        let cdc = new ContactDetailClient();

        cdc.UpdateContact(vm.editContact)
          .then(()=> {
            vm.$refs.addEditModal.close();
            vm.$toastr('success', 'contact_updated')
            vm.loadContacts();
          });
      },
      showInfoModal(contact) {
        let vm = this;

        let cd = new ContactDetailClient()
        vm.isLoading = true;
        cd.GetContact(contact.id)
          .then((result) => {
            vm.isLoading = false;
            vm.currentContact = result;
            vm.$refs.contactNumbersModal.show();
          });


      },
      openEditContact(contact) {
        let vm = this;

        let cd = new ContactDetailClient()
        vm.isLoading = true;
        cd.GetContact(contact.id)
          .then((result) => {
            vm.isLoading = false;
            vm.editContact = result;
            this.$refs.addEditModal.show();
          });

      },
      deleteContact(contact) {
        //contact.id
        let vm = this;
        vm.$confirm("delete_contact", `Are you sure you want to delete '${contact.firstName} ${contact.lastName}'`, "remove", "keep", () => {
          let c = new ContactDetailClient()

          vm.isLoading = true;
          c.DeleteContact(contact.id)
            .then(() => {
              vm.$toastr('success', 'contact_deleted')
              vm.loadContacts();
            })
        })
      },
      addContact() {
        let vm = this;
        let cc = new ContactDetailClient();

        vm.isLoading = true;
        cc.CreateContact(vm.editContact)
          .then((result) => {
            vm.isLoading = false;
            vm.$toastr('success', 'contact_created');
            //vm.editContact.contactNumbers.clear();
            vm.loadContacts();
          });
      },
      removeContactNumber(row) {
        const index = this.editContact.contactNumbers.indexOf(row);
        if (index !== -1) {
          this.editContact.contactNumbers.splice(index, 1);
        }
      },
      addContactNumber() {
        let vm = this;
        let newNumber = _.cloneDeep(vm.newContactNumber);
        vm.editContact.contactNumbers.push(newNumber)
        vm.newContactNumber.numberType = null;
        vm.newContactNumber.number = null;
      },

      loadContacts() {
        let vm = this;
        let contactDetailClient = new ContactDetailClient();
        vm.isLoading = true;

        contactDetailClient.GetAllContacts()
          .then((result) => {
            vm.isLoading = false;
            vm.contacts = result;
          })
      }
    },
    mounted() {
      let vm = this;
      vm.loadContacts();
    }

  }
</script>

<style scoped>

</style>