import Vue from 'vue';

export const loadUserAuthDetail = ({commit}, payLoad) => {
  commit('AUTH_DETAILS', payLoad);
};


