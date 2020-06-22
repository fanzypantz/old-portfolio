export const state = () => ({
  openPage: false
});

export const mutations = {
  toggleOpenPage(state) {
    state.openPage = !state.openPage;
  },

  setOpenPage(state, bool) {
    state.openPage = bool;
  }
};

// export const actions = {
//   nuxtServerInit({ commit }, { req }) {
//     console.log('session: ', req.session);
//     if (req.session && req.session.authUser) {
//       commit('setUser', req.session.authUser);
//     }
//   }
// };
