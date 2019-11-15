import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flights: [],
    airports: [],
    depLocationName: null,
    depLocationCode: null,
    arrLocationName: null,
    arrLocationCode: null,
    depDate: null,
    returnDate: null,
    searchMessage: "No Search History",
    layoverAirports: [],
    layoverCount:0,
    numItemsPerPage:10,
    numPages:0,
    currentPage:1
  },
  mutations: {
    setSearchDetails: (state, payload) => {
      state.depLocationName = payload.depLoc;
      state.depLocationCode = payload.depLocCode;
      state.arrLocationName = payload.arrLoc;
      state.arrLocationCode = payload.arrLocCode;
      state.depDate = payload.depDate;
      state.returnDate = payload.retDate;
    },
    setFlighsResult: (state, payload) => {
      state.flights = payload;

      // creating flight filter items
      let layovers = [];
      let stops = [];
      state.flights.data.forEach(flight => {
        // layover
        if (flight.route.length > 1) {
          flight.route.forEach((stps, index) => {
            // console.log(
            //   layovers.indexOf({ name: stps.cityTo, code: stps.cityCodeTo })
            // );
            if (index == 0) {
              layovers.push({ name: stps.cityTo, code: stps.cityCodeTo });
            } else {
              layovers.push({ name: stps.cityFrom, code: stps.cityCodeFrom });
            }
          });
        }

        // stops
        stops.push(flight.route.length);
      });

      // removing duplicate entries
      let tempLyrKeys = new Set();
      let fLyrs = layovers.filter(
        item => !tempLyrKeys.has(item.code) && tempLyrKeys.add(item.code)
      );
      state.layoverAirports = fLyrs;

      // finding highest number of stops
      state.layoverCount = Math.max(...stops)

      // calculating page nums
      state.numPages = Math.ceil(state.flights.data.length / state.numItemsPerPage)
    },
    setCurrntPage:(state,payload)=> {
      state.currentPage = payload;
    }
  },
  actions: {},
  modules: {}
});
