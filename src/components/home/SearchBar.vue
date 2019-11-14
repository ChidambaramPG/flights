<template>
  <section>
    <div class="row search-section">
      <div class="col-md-3">
        <input
          class="form-control dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          placeholder="From"
          v-model="departureLocation"
          v-on:keyup="fetchDepartureAirports"
        />
        <div class="dropdown-menu" id="depAirportsList">
          <span
            class="dropdown-item"
            v-for="(item, index) in airports"
            :key="index"
            :id="index"
            @click="selectDepAirport"
            >{{ item.name + " (" + item.id + ")" }}</span
          >
        </div>
      </div>
      <div class="col-md-3">
        <input
          class="form-control dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          placeholder="To"
          v-model="arrivalLocation"
          v-on:keyup="fetchArrivalAirports"
        />
        <div class="dropdown-menu" id="arrAirportsList">
          <span
            class="dropdown-item"
            v-for="(item, index) in airports"
            :key="index"
            :id="index"
            @click="selectArrAirport"
            >{{ item.name + " (" + item.id + ")" }}</span
          >
        </div>
      </div>
      <div class="col-md-3">
        <date-picker
          v-model="departueDate"
          valueType="format"
          format="D/M/YYYY"
        ></date-picker>
      </div>
      <div class="col-md-3">
        <date-picker
          v-if="departueDate == null"
          disabled
          v-model="returnDate"
          valueType="format"
          format="D/M/YYYY"
        >
        </date-picker>
        <date-picker
          v-else
          v-model="returnDate"
          valueType="format"
          format="D/M/YYYY"
        >
        </date-picker>
      </div>
    </div>
    <div class="row search-section">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <button class="btn btn-danger btn-block" @click="searchFlights">
          Search
        </button>
      </div>
      <div class="col-md-4"></div>
    </div>
  </section>
</template>
<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "SearchBar",
  data() {
    return {
      departureLocation: null,
      depCode: null,
      arrivalLocation: null,
      arrCode: null,
      airports: [],
      depSelected: "",
      departueDate: null,
      returnDate: null
    };
  },
  components: {
    DatePicker
  },
  created() {},
  methods: {
    fetchDepartureAirports() {
      console.log(this.departureLocation);
      if (this.departureLocation.length > 2) {
        let arptFetchUrl =
          "https://api.skypicker.com/locations/?limit=5&locale=en-US&term=" +
          this.departureLocation +
          "&location_types=airport";
        fetch(arptFetchUrl)
          .then(resp => resp.json())
          .then(data => {
            this.airports = data.locations;
            this.depCode = data.locations.id;
            document.getElementById("depAirportsList").style.display = "block";
          });
      } else {
        document.getElementById("depAirportsList").style.display = "none";
      }
    },
    selectDepAirport(e) {
      console.log(e);
      let airportSelected = this.airports[e.target.id];
      this.depCode = airportSelected.id;
      this.departureLocation = airportSelected.name + "," + airportSelected.id;
      document.getElementById("depAirportsList").style.display = "none";
    },
    fetchArrivalAirports() {
      console.log(this.arrivalLocation);
      if (this.arrivalLocation.length > 2) {
        let arptFetchUrl =
          "https://api.skypicker.com/locations/?limit=5&locale=en-US&term=" +
          this.arrivalLocation +
          "&location_types=airport";
        fetch(arptFetchUrl)
          .then(resp => resp.json())
          .then(data => {
            this.airports = data.locations;

            document.getElementById("arrAirportsList").style.display = "block";
          });
      } else {
        document.getElementById("arrAirportsList").style.display = "none";
      }
    },
    selectArrAirport(e) {
      console.log(e);
      let airportSelected = this.airports[e.target.id];
      this.arrCode = airportSelected.id;
      this.arrivalLocation = airportSelected.name + "," + airportSelected.id;
      document.getElementById("arrAirportsList").style.display = "none";
    },
    searchFlights() {
      if (
        this.depCode != null &&
        this.arrCode != null &&
        this.departueDate != null &&
        this.returnDate
      ) {
        this.$store.commit("setSearchDetails", {
          depLoc: this.departureLocation,
          depLocCode: this.depCode,
          arrLoc: this.arrivalLocation,
          arrLocCode: this.arrCode,
          depDate: this.departueDate,
          retDate: this.returnDate
        });

        fetch(
          "https://api.skypicker.com/flights?flyFrom=" +
            this.depCode +
            "&to=" +
            this.depCode +
            "&dateFrom=" +
            this.departueDate +
            "&dateTo=" +
            this.returnDate +
            "&partner=picky"
        )
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if(data.data.length > 0){
              this.$store.commit("setFlighsResult",data);

              this.$route.push("results")
            }else{
              alert("no flights found")
            }
            
          })
          .catch(e => console.log(e));
      }
    }
  }
};
</script>
<style>
.search-section {
  padding: 25px;
  margin: -30px 30px 0px 30px;
  background-color: rgb(240, 236, 236);
  border-radius: 10px;
}
</style>
