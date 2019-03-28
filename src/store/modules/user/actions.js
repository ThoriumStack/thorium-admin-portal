import Mgr from '../../../common/SecurityService'

export const loadUser = ({commit}, userParams) => {
  let mgr = new Mgr()

  mgr.getProfile().then((userProfile) => {
    commit('SET_USER', userProfile);
  });




};