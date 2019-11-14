import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flights:[],
    airports:[],
    depLocationName:null,
    depLocationCode:null,
    arrLocationName:null,
    arrLocationCode:null,
    depDate:null,
    returnDate:null
  },
  mutations: {
    setSearchDetails: (state,payload)=> {
      state.depLocationName = payload.depLoc;
      state.depLocationCode = payload.depLocCode;
      state.arrLocationName = payload.arrLoc;
      state.arrLocationCode = payload.arrLocCode;
      state.depDate = payload.depDate;
      state.returnDate = payload.retDate;
    },
    setFlighsResult:(state,payload)=> {
      state.flights = payload;
    }
  },
  actions: {},
  modules: {}
});
