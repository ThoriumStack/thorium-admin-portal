import state from './state'
import getters from './getters'
import mutations from './mutations'
import * as actions from './actions';

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
};