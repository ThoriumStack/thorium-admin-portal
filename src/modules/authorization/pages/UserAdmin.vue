<template>
    <page title="access_control" :is-loading="isLoading" translate="true" icon="shield">

        <div class="ui  menu">
            <a @click="tab = 'roles'" :class="{active: tab === 'roles'}" class="ui  item">
                Roles
            </a>
            <a @click="tab = 'user_roles'" :class="{active: tab === 'user_roles'}" class="ui item">
                User Roles
            </a>
            <a class="ui item" @click="tab = 'resources'" :class="{active: tab === 'resources'}">
                Resources
            </a>

        </div>
        <div v-show="tab === 'roles'">

            <div class="ui container">
                <div class="ui inverted  dimmer" :class="{active: rolesLoading}">
                    <div class="ui loader"></div>
                </div>

                <vue-table
                        v-model="roles"
                        :actions="roleActions"
                        :column-setup="roleColumns"
                        @removeRole="removeRole"
                        @editRole="editRole"
                ></vue-table>
                <button @click="addRole" class="ui primary button">Add</button>
            </div>
        </div>
        <div v-show="tab === 'user_roles'">
            <div class="ui container">
                <div class="ui inverted  dimmer" :class="{active: rolesLoading}">
                    <div class="ui loader"></div>
                </div>

                <vue-table
                        v-model="users"
                        :actions="userRoleActions"
                        @editUserRoles="editUserRoles"
                        :column-setup="userColumnSetup">
                    <template slot="footer">
                        <pagination :total="totalUsers" :current-page="userPage" :per-page="usersPerPage"
                                    @change="changeUserPage"></pagination>
                    </template>
                </vue-table>
            </div>

            <vue-modal mini ref="editUserRole">
                <template slot="header">
                    <i class="edit icon"></i>Edit Role for {{selectedUsername}}
                </template>
                <template slot="content">
                    <vue-drop-down v-model="selectedUserRole" drop-down-id="role_dropdown"
                                   :options="roles"></vue-drop-down>
                </template>
                <template slot="actions">
                    <button @click.prevent="saveUserRole" class="ui positive button">{{$t('save')}}</button>
                </template>
            </vue-modal>
        </div>
        <div v-show="tab === 'resources'">
            <div class="ui container">
                <div class="ui inverted  dimmer" :class="{active: resourceLoading}">
                    <div class="ui loader"></div>
                </div>

                <vue-table v-model="resources" @editResource="editResource" :actions="resourceActions"
                           :column-setup="resourceColumns"></vue-table>
                <button id="btnCreate" @click.prevent="addResource" class="ui button primary">Create</button>
            </div>
        </div>

    </page>
</template>

<script>
  import VueTable from "@/components/common/VueTable";
  import {AuthorizationAdminClient} from "@/modules/authorization/api/v1_0/AuthorizationAdminClient_v1_0";
  import VueModal from "@/components/common/VueModal";
  import TextField from "@/components/common/form-components/TextField";
  import VueDropDown from "@/components/common/VueDropDown";
  import {UsersClient} from "../api/v1_0/UsersClient_v1_0";
  import Pagination from "@/components/common/Pagination";
  import Page from "@/components/common/Page";

  export default {
    name: "UserAdmin",
    components: {Page, Pagination, VueDropDown, TextField, VueModal, VueTable},
    data: function () {
      return {
        totalUsers: 0,
        selectedUserRole: null,
        selectedUsername: '',
        selectedUserId: '',
        totalUserPages: 0,
        usersPerPage: 10,
        userPage: 1,
        isLoading: false,
        users: [],
        userColumnSetup: [
          {description: "Username", path: "username"},
          {description: "Role", path: "roleDescription"}
        ],
        userRoleActions: [
          {description: "", icon: "edit", action: "editUserRoles"}
        ],
        roleColumns: [
          {description: "Description", path: "description"},
          {description: "Key", path: "key"}
        ],
        roleActions: [
          {action: "editRole", icon: "edit"},
          {action: "removeRole", icon: "trash"}
        ],
        resourceColumns: [
          {description: "Description", path: "description"},
          {description: "Key", path: "key"}
        ],
        resourceActions: [
          {action: "editResource", icon: "edit"}
        ],
        permissionColumns: [
          {description: "Description", path: "description"},
          {description: "Key", path: "key"}
        ],
        permissionActions: [
          {action: "addResource", icon: "plus"}
        ],

        tab: 'roles',
        currentRole: {
          permissions: []
        },
        roles: [],
        rolesLoading: false,
        resources: [],
        permissionTypes: [{description: 'Allow', id: 1}, {description: 'Deny', id: 2}],
        selectedResource: null,
        resourceDetails: [],
        resourceLoading: false,
        currentPermission: {}
      }
    },

    methods: {
      addResource() {
        this.$router.push({name: "addResource"})
      },
      saveUserRole() {
        let vm = this;
        let adminClient = new AuthorizationAdminClient()
        adminClient.AddUserToRole(vm.selectedUserId, vm.selectedUserRole)
          .then((result) => {
            adminClient.GetUserRoles(vm.selectedUserId)
              .then((userRoles) => {
                if (!userRoles || userRoles.length < 1) {
                  return '';
                }
                vm.selectedUser.roleDescription = userRoles[0].roleDescription;
                vm.selectedUser.roleId = userRoles[0].roleId;
               // return user;
                this.$toastr('success', "Added user to role")
              })

          })
      },
      getUserRoles() {
        let vm = this;
        let adminClient = new AuthorizationAdminClient();
        let userClient = new UsersClient();

        vm.userRolesLoading = true;

        userClient.GetUsers(vm.userPage - 1, vm.usersPerPage)
          .then((result) => {
            let promises = []
            for (let user of result.items) {
              promises.push(adminClient.GetUserRoles(user.id)
                .then((userRoles) => {
                  if (!userRoles || userRoles.length < 1) {
                    return '';
                  }
                  user.roleDescription = userRoles[0].roleDescription;
                  user.roleId = userRoles[0].roleId;
                  return user;
                }));
            }

            Promise.all(promises).then((values) => {
              vm.users = result.items;
              vm.totalUsers = result.totalItems;
              vm.totalUserPages = result.totalPages;
              vm.userRolesLoading = false;
            });


          });
      },
      editUserRoles(user) {
        this.selectedUsername = user.username;
        this.selectedUserId = user.id;
        this.selectedUserRole = user.roleId;
        this.selectedUser = user;
        this.$refs.editUserRole.show();
      },
      removePermissionItem(item) {

        this.currentRole.permissions.splice(this.currentRole.permissions.indexOf(item), 1)
      },
      getResourceDescription(resourceId) {
        return this.resources.filter(_ => _.id == resourceId)[0].description;
      },
      getResourceDetailDescription(resourceDetailId) {
        return this.resourceDetails.filter(_ => _.id == resourceDetailId)[0].description;
      },
      getPermissionType(permissionTypeId) {
        return this.permissionTypes.filter(_ => _.id == permissionTypeId)[0].description;
      },
      addRole() {
        this.$router.push({name: "addRole"})
      },
      editRole(role) {
        this.$router.push({name: "editRole", params: {roleId: role.id}})
      },
      removeRole(role) {
        let vm = this;
        let authClient = new AuthorizationAdminClient();
        authClient.RemoveRole(role.id)
          .then((result) => {
            vm.roles.indexOf(role);
            vm.roles.splice(vm.roles.indexOf(role), 1);
          })
      },
      editResource(resource) {
        this.$router.push({name: "editResource", params: {resourceId: resource.id}})
      },
      addPermission() {
        this.currentPermission.permissionTypeDescription = this.getPermissionType(this.currentPermission.permissionType);
        this.currentPermission.resourceDescription = this.getResourceDescription(this.selectedResource);
        this.currentPermission.resourceDetailDescription = this.getResourceDetailDescription(this.currentPermission.resourceDetailId);
        this.currentRole.permissions.push(_.cloneDeep(this.currentPermission))
      },
      changeUserPage(page) {
        this.userPage = page;
        this.getUserRoles();
      }
    },
    mounted() {
      let vm = this;
      let adminClient = new AuthorizationAdminClient();
      this.rolesLoading = true;
      adminClient.GetAllRoles(0, 100)
        .then((roles) => {
          this.rolesLoading = false;
          vm.roles = roles.items;
        });
      this.resourceLoading = true;
      adminClient.GetAllResources(0, 100)
        .then((roles) => {
          this.resourceLoading = false;
          vm.resources = roles.items;
        });

      vm.getUserRoles();
    }
  }
</script>

<style scoped>

</style>