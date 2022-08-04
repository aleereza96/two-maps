<template>
  <div id="app">
    <div v-if="initializing" style="text-align: center">
      <img src="./assets/SVG_animated_loading_icon.svg" alt="" srcset="" />
    </div>
    <div v-else style="display: flex; flex-flow: row-reverse">
      <div style="margin-left: 2rem; width: 35vw; margin-top: 50vh">
        <p>Please select your precision:</p>
        <input type="radio" id="precision1" name="precision" value="4" v-model="precision" />
        <label for="precision1">11 m</label><br />
        <input type="radio" id="precision2" name="precision" value="3" v-model="precision" />
        <label for="precision2">111 m</label><br />
        <input type="radio" id="precision3" name="precision" value="2" v-model="precision" />
        <label for="precision3">1 km</label><br />
        <input type="radio" id="precision4" name="precision" value="1" v-model="precision" />
        <label for="precision4">11 km</label><br /><br />
      </div>
      <div style="">
        <SimpleMap :markers="markers" :bounds="bounds" />
        <DynamicMap :markers="markers" :initial-bounds="bounds" :decimal="precision" />
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMap from './components/SimpleMap'
import DynamicMap from './components/DynamicMap'
import jsonData from './test-2.json'

export default {
  name: 'App',
  components: {
    SimpleMap,
    DynamicMap
  },
  data() {
    return {
      initializing: true,
      markers: [],
      bounds: [],
      precision: 4
    }
  },
  watch: {
    precision() {
      this.markers = this.makeMarkers(jsonData)
      this.bounds = this.makeMarkers(jsonData).map((i) => [i.lat, i.lon])
    }
  },
  mounted() {
    setTimeout(() => {
      this.markers = this.makeMarkers(jsonData)
      this.bounds = this.makeMarkers(jsonData).map((i) => [i.lat, i.lon])
      this.initializing = false
    }, 2000)
  },
  methods: {
    makeMarkers(json) {
      const baseArray = JSON.parse(JSON.stringify(json)).object
      let locations = []
      baseArray.forEach((item) => {
        locations = [...locations, ...item.locations]
      })
      return locations
    }
  }
}
</script>

<style>
.leaflet-control-attribution {
  display: none !important;
}
</style>
