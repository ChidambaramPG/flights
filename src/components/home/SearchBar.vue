<template>
  <section>
    <div class="row search-section">
        <div class="col-md-1"></div>
      <div class="col-md-2">
          <input class="form-control" placeholder="From" />
      </div>
      <div class="col-md-2">
          <input class="form-control" placeholder="To" />
      </div>
      <div class="col-md-2">
          <input class="form-control" placeholder="Departure" />
      </div>
      <div class="col-md-2">
          <input class="form-control" placeholder="Return" />
      </div>
      
      <div class="col-md-2 ">
          <a href="" class="btn btn-warning btn-block">Search Flights</a>
      </div>
    </div>
    
  </section>
</template>
<script>

export default {
  name: "SearchBar",
  created(){
      
  }
};
</script>
<style>

.search-section{
    padding:25px;
    margin:-30px 30px 0px 30px;
    background-color:rgb(240, 236, 236);
    border-radius: 10px;
}
    
</style>
