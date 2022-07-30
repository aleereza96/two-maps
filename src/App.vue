<template>
  <div id="app">
    <div v-if="initializing" style="text-align: center">
      <img src="./assets/SVG_animated_loading_icon.svg" alt="" srcset="">
    </div>
    <div v-else>
      <SimlpeMap :markers="markers" :bounds="bounds" />
      <DynamicMap :markers="markers" />
    </div>
  </div>
</template>

<script>
import SimlpeMap from './components/SimlpeMap'
import DynamicMap from './components/DynamicMap'
import jsonData from './test.json'

export default {
  name: 'App',
  components: {
    SimlpeMap,
    DynamicMap
  },
  data() {
    return {
      initializing: true,
      markers: [],
      bounds: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.markers = this.makeMarkers(jsonData)
      this.bounds = this.makeMarkers(jsonData)
      this.initializing = false
    }, 2000)
  },
  methods: {
    makeMarkers(json) {
      const locations = JSON.parse(JSON.stringify(json)).object.locations
      return locations.map((item) => [item.lat, item.lon])
    }
  }
}
</script>
