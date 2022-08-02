<template>
  <div style="display: flex; justify-content: center; margin-top: 2rem">
    <l-map
      style="height: 450px; width: 500px; display: flex; justify-content: center"
      ref="dyMap"
      :zoom="zoom"
      :bounds="initialBounds"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker v-for="(marker, index) in getMarkers" :key="index" :lat-lng="[marker.lat, marker.lon]" />
    </l-map>
  </div>
</template>

<script>
export default {
  name: 'DynamicMap',
  props: ['markers', 'initialBounds'],
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 13,
      center: [47.41322, -1.219482],
      bounds: null
    }
  },
  computed: {
    getMarkers() {
      if (this.bounds) {
        const bounds = JSON.parse(JSON.stringify(this.bounds))
        const newMarkers = []
        this.markers.forEach((item) => {
          if (
            item.lat > bounds._southWest.lat &&
            item.lon > bounds._southWest.lng &&
            item.lat < bounds._northEast.lat &&
            item.lon < bounds._northEast.lng
          )
            newMarkers.push(item)
        })
        return newMarkers
      } else return this.markers
    }
  },
  methods: {
    boundsUpdated(bounds) {
      this.bounds = bounds
    }
  }
}
</script>
