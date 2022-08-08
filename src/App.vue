<template>
  <div id="app">
    <div v-if="initializing" style="text-align: center">
      <img src="./assets/SVG_animated_loading_icon.svg" alt="" srcset="" />
    </div>
    <div v-else>
      <div>
        <SimpleMap :markers="markers" :bounds="bounds" :distance="distance" :showIcons="showIcons" />
      </div>
      <div style="margin-left: 2rem; width: 50rem; margin-top: 2rem">
        <p>Please select your distance:</p>
        <input type="radio" id="distance0" name="distance" :value="null" v-model="distance" />
        <label for="distance0">default</label><br />
        <input type="radio" id="distance1" name="distance" :value="100" v-model="distance" />
        <label for="distance1">100 m</label><br />
        <input type="radio" id="distance2" name="distance" :value="500" v-model="distance" />
        <label for="distance2">500 m</label><br />
        <input type="radio" id="distance3" name="distance" :value="1000" v-model="distance" />
        <label for="distance3">1 km</label><br />
        <input type="radio" id="distance4" name="distance" :value="5000" v-model="distance" />
        <label for="distance4">5 km</label><br /><br />
      </div>
      <div>
        <button
          style="
            background-color: #23a303;
            cursor: pointer;
            padding: 1.5rem;
            margin-top: 0.5rem;
            color: #ffffff;
            border: none;
            border-radius: 20px;
          "
          @click="toggleIcons"
        >
          toggle icons
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMap from './components/SimpleMap'
import jsonData from './test-2.json'

export default {
  name: 'App',
  components: {
    SimpleMap
  },
  data() {
    return {
      initializing: true,
      markers: [],
      bounds: [],
      distance: null,
      showIcons: true
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
      return locations.sort((a, b) => a.timestamp - b.timestamp)
    },
    toggleIcons() {
      this.showIcons = !this.showIcons
    }
  }
}
</script>

<style>
.leaflet-control-attribution {
  display: none !important;
}
</style>
