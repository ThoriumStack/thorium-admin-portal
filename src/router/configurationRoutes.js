
import UserAdmin from '@/modules/authorization/pages/UserAdmin'
import EditRole from '@/modules/authorization/pages/EditRole'
import ResourceAdmin from '@/modules/authorization/pages/ResourceAdmin'

export const configurationRoutes = [


  {
    path: 'authorization',
    component: UserAdmin,

  },
  {
    path: 'authorization/roles/edit',
    name: 'addRole',
    component: EditRole,
    children: [
      {
        path: ':roleId',
        name: 'editRole'

      }
    ]

  }, {
    path: 'authorization/resources/edit',
    name: 'addResource',
    component: ResourceAdmin,
    children: [
      {
        path: ':resourceId',
        name: 'editResource'

      }
    ]
  },

];