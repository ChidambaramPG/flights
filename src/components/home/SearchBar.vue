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
            class="dropdown-item "
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
      <div class="col-md-3">
        <div class="row count-row">
          <div class="col-md-4 col-1 ">
            <button class="btn btn-danger" @click="decrAdults">-</button>
          </div>
          <div class="col-md-4 col-1 " style="vertical-align:middle">
            {{ adultCount }}
          </div>
          <div class="col-md-4 col-1 ">
            <button class="btn btn-danger" @click="incrAdults">+</button>
          </div>
        </div>
        <div class="row count-row">
          <div class="col-md-4 col-1">
            <button class="btn btn-danger" @click="decrChildren">-</button>
          </div>
          <div class="col-md-4 col-1" style="vertical-align:middle">
            {{ childCount }}
          </div>
          <div class="col-md-4 col-1">
            <button class="btn btn-danger" @click="incrChildren">+</button>
          </div>
        </div>
      </div>
      <div class="col-md-1"></div>
      <div class="col-md-2">
        <button
          class="btn btn-danger btn-block btn-search"
          @click="searchFlights"
        >
          Search
        </button>
      </div>
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
      returnDate: null,
      adultCount: 1,
      childCount: 0
    };
  },
  components: {
    DatePicker
  },
  created() {},
  methods: {
    incrAdults() {
      if (this.adultCount < 11) {
        this.adultCount++;
      }
    },
    incrChildren() {
      if (this.childCount < 11) {
        this.childCount++;
      }
    },
    decrAdults() {
      if (this.adultCount > 1) {
        this.adultCount--;
      }
    },
    decrChildren() {
      if (this.childCount > 0) {
        this.childCount--;
      }
    },
    fetchDepartureAirports() {
      // console.log(this.departureLocation);
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
      // console.log(e);
      let airportSelected = this.airports[e.target.id];
      this.depCode = airportSelected.id;
      this.departureLocation = airportSelected.name + "," + airportSelected.id;
      document.getElementById("depAirportsList").style.display = "none";
    },
    fetchArrivalAirports() {
      // console.log(this.arrivalLocation);
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
      // console.log(e);
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
        this.returnDate != null &&
        this.adultCount > 0
      ) {
        this.$store.commit("setSearchDetails", {
          depLoc: this.departureLocation,
          depLocCode: this.depCode,
          arrLoc: this.arrivalLocation,
          arrLocCode: this.arrCode,
          depDate: this.departueDate,
          retDate: this.returnDate,
          adultCount: this.adultCount,
          childCount: this.childCount
        });

        fetch(
          "https://api.skypicker.com/flights?fly_from=" +
            this.depCode +
            "&fly_to=" +
            this.arrCode +
            "&date_from=" +
            this.departueDate +
            "&date_to=" +
            this.returnDate +
            "&partner=picky&adults=" +
            this.adultCount +
            "&v=3&children=" +
            this.childCount +
            "&curr=INR"
        )
          .then(res => res.json())
          .then(data => {
            // console.log(data);
            if (data.data.length > 0) {
              this.$store.commit("setFlighsResult", data);
              // this.$router.push("results")
            } else {
              alert("no flights found");
            }
          })
          .catch(e => alert(e));
      }
    }
  }
};
</script>
<style>
.search-section {
  padding: 25px;
  margin: -75px 30px 0px 30px;
  background-color: rgb(240, 236, 236);
  border-radius: 10px;
  text-align: center;
}
input {
  margin-top: 10px;
}
.btn-search {
  border-radius: 100%;
  height: 100px;
  width: 100px;
}
.mx-datepicker {
  /* position: relative; */
  /* display: inline-block; */
  /* margin-top:5px; */
  width: 100%;
  color: #73879c;
  font: 14px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei",
    sans-serif;
}
.mx-input {
  padding: 18px;
}

.count-row {
  margin-top: 10px;
  position: middle;
}
</style>
