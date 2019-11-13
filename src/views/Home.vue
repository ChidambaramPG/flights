<template>
  <div class="home">
    <FeatureImage/>
    <SearchBar/>
  </div>
</template>

<script>
import SearchBar from "../components/home/SearchBar.vue";
import FeatureImage from "../components/home/FeatureImage.vue";

export default {
  name: "home",
  components: {
    SearchBar,
    FeatureImage
  }
};
</script>


