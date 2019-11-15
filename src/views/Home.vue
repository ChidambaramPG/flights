<template>
  <div class="home">
    <FeatureImage/>
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-10">
        <SearchBar/>
      </div>
      <div class="col-md-1"></div>
    </div>
    
    <div class="row">
      <div class="col-md-3">
        <SearchFilters/>
      </div>
      <div class="col-md-9">
        <SearchResult/>
      </div>
    </div>
    
  </div>
</template>

<script>
import SearchBar from "../components/home/SearchBar.vue";
import FeatureImage from "../components/home/FeatureImage.vue";
import SearchResult from "../components/home/SearchResult.vue";
import SearchFilters from "../components/home/SearchFilters.vue";

export default {
  name: "home",
  components: {
    SearchBar,
    FeatureImage,
    SearchResult,
    SearchFilters
  }
};
</script>



