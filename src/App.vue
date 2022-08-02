<template>
  <div id="app">
    <div v-if="initializing" style="text-align: center">
      <img src="./assets/SVG_animated_loading_icon.svg" alt="" srcset="" />
    </div>
    <div v-else>
      <SimlpeMap :markers="markers" :bounds="bounds" />
      <DynamicMap :markers="markers" :initial-bounds="bounds" />
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
      this.bounds = this.makeMarkers(jsonData).map((i) => [i.lat, i.lon])
      this.initializing = false
    }, 2000)
  },
  methods: {
    makeMarkers(json) {
      return JSON.parse(JSON.stringify(json)).object.locations
    }
  }
}
</script>
