import { createStore } from "vuex";

export default createStore({
  state: {
    selectedItem: null,
  },
  mutations: {
    setSelectedItem(state, item) {
      state.selectedItem = item;
    },
  },
  modules: {},
});