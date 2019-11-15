<template>
  <section>
    <div
      class="row flight-card border"
      v-for="(flight, index) in flights"
      :key="index"
    >
      <div class="col-md-2 airline-img">
          <img :src="getImgLink(flight.airlines[0])" alt="">
      </div>
      
      <div class="col-md-3">
        <p>
          {{ flight.cityFrom }}({{ flight.cityCodeFrom }}),{{
            flight.countryFrom.code
          }}
        </p>
        <p>{{ formatTimeType1(flight.dTime) }}</p>
      </div>
      <div class="col-md-2">
          <p>{{ (flight.duration.total/(60*60)).toFixed(2)}} hr</p>
          <p>{{ flight.distance}} km</p>
      </div>
      <div class="col-md-3">
        <p>
          {{ flight.cityTo }}({{ flight.cityCodeTo }}),{{
            flight.countryTo.code
          }}
        </p>
        <p>{{ formatTimeType1(flight.aTime) }}</p>
      </div>
      
      <div class="col-md-2">
          <h6>INR {{flight.price}}</h6>
          <a class="btn btn-danger btn-block" target="_blank" :href="flight.deep_link">Book Now</a>
      </div>
    </div>
    <div class="search-message">
      <a class="btn btn-danger page-numbers" @click="(e)=>changePageNum(e)" v-for="(page,index) in totalPages" :id="page" :key="index">{{page}}</a>
    </div>
  </section>
</template>
<script>
export default {
  name: "SearchResult",
  data() {
    return {
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    };
  },
  computed: {
    flights() {

      if(this.$store.state.flights.data != undefined){
        let flights = this.$store.state.flights.data;
        let curPage = this.$store.state.currentPage;
        let itemsPerPage = this.$store.state.numItemsPerPage;

        return flights.slice(itemsPerPage*curPage,(itemsPerPage*curPage)+itemsPerPage)
      }else{
        return []
      }
      
    },
    searchMessage() {
      return this.$store.state.searchMessage;
    },
    totalPages(){
      return this.$store.state.numPages;
    }
  },
  methods: {
    formatTimeType1(sec) {
      let dt = new Date(sec * 1000);
      return (
        dt.getDate() + " " + this.months[dt.getMonth()] + " " + dt.getFullYear()
      );
    },
    getImgLink(pic){
        let link_url = "https://daisycon.io/images/airline/?width=80&height=80&color=ffffff&iata=" + pic;
		return link_url;
    },
    changePageNum(event){
      // console.log(event)
      this.$store.commit("setCurrntPage",event.target.id)
    }
  }
};
</script>
<style>
.search-message {
  margin-top: 100px;
}
.flight-card {
  height: 100px;
  margin: 20px 30px 0pc 30px;
  padding: 20px;
}
.airline-img{
    margin-top:-10px
}
.page-numbers{
  color:white;
  padding:5px;
  width:30px;
  margin-right:2px;
}
</style>
