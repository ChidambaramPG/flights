<template>
    <section class="section-filter border" v-if="flights != undefined && flights.length > 0">
        <h4>Filters</h4>
        <div class="row ">
            <div class="col-md-12 stops-card border-top">
                <h5>Layover Airports</h5>
                <ul class="layover-list">
                    <li v-for="(stop,index) in layovers" :key="index">
                        <input type="checkbox" :name="stop.name" :id="stop.code">{{stop.name}}
                    </li>
                </ul>
            </div>            
        </div> 
        <div class="row">
            <div class="col-md-12 stops-card border-top">
                <h5>Stops</h5>
                <ul class="layover-list">
                    <li v-for="(stop,index) in stops" :key="index">
                        <input type="checkbox" name="" id="">{{stop}}
                    </li>
                </ul>
            </div>            
        </div>   
        <div class="row">
            <div class="col-md-12 stops-card border-top">
                <button class="btn btn-danger btn-block rounded-pill">Apply</button>
            </div>            
        </div>        
    </section>
</template>
<script>
export default {
    name:"SearchFilters",
    data(){
        return {
            
        }
    },
    computed:{
        layovers(){
            return this.$store.state.layoverAirports;
        },
        flights(){
            return this.$store.state.flights.data;
        },
        stops(){
            return this.$store.state.layoverCount;
        }
    },
    methods:{

    }
}
</script>
<style>
.section-filter{
    margin-left:20px;
    padding:20px;
    margin-top:20px;
}
.layover-list{
    list-style-type: none;
    max-height:200px;
    overflow:hidden; 
    overflow-y:scroll;
    
}
.stops-card{
    text-align:left;
    margin-top:20px;
    padding-top:20px;
}
</style>