<template>
  <div id="app">
    <div v-if="initializing" style="text-align: center">
      <img src="./assets/SVG_animated_loading_icon.svg" alt="" srcset="" />
    </div>
    <div v-else-if="failed">
      <h3>Something went wrong !!!</h3>
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

export default {
  name: 'App',
  components: {
    SimpleMap
  },
  props: ['íd'],
  data() {
    return {
      initializing: true,
      markers: [],
      bounds: [],
      failed: false,
      distance: null,
      showIcons: true
    }
  },
  created() {
    if (!this.$route.params.id) this.$router.push('/receipt/34')
  },
  mounted() {
    this.makeMarkers()
      .then(() => {
        this.bounds = this.markers.map((i) => [i.lat, i.lon])
        this.initializing = false
      })
      .catch((err) => {
        this.initializing = false
        this.failed = true
        console.log(err)
      })
  },
  methods: {
    async postData(url = '') {
      let formdata = new FormData()
      formdata.append('token', `${process.env.VUE_APP_TOKEN}`)

      let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      }
      const response = await fetch(url, requestOptions)
      return response.json()
    },
    makeMarkers() {
      const id = +this.$route.params.id
      return this.postData(`https://tapi.cveh.ir/v1/map/${id}`).then((res) => {
        res.data.locations.sort((a, b) => a.timestamp - b.timestamp)
        this.markers = res.data.locations
      })
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
