<template>
  <div class="result">
    {{flights}}
  </div>
</template>

<script>


export default {
  name: "Results",
  components: {
    
  },
  computed:{
      flights(){
          return this.$store.state.flights;
      }
  }
};
</script>


