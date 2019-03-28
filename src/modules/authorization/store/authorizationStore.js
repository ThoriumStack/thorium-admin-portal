import * as actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

export default {
    namespace: true,
    state,
    actions,
  getters,
  mutations
};