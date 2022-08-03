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
      <l-marker v-for="(marker, index) in getMarkers" :key="index" :lat-lng="[marker.lat, marker.lon]">
        <l-icon :icon-size="[10, 15]" :iconAnchor="[0, 0]" :popupAnchor="[0, -35]" :tooltipAnchor="[0, -35]">
          <img src="../assets/car_topview.svg" alt="marker" v-bind="makeStyle(marker.bearing)" />
        </l-icon>

        <l-tooltip :options="{direction: 'top'}">
          {{ getDate(marker.timestamp) }}
        </l-tooltip>
      </l-marker>

      <l-polyline :lat-lngs="polylineLatLng" color="green"></l-polyline>
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
    },
    polylineLatLng() {
      return this.getMarkers.map((i) => [i.lat, i.lon])
    }
  },
  methods: {
    boundsUpdated(bounds) {
      this.bounds = bounds
    },
    getDate(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleString('fa-FA', {timeZone: 'Asia/Tehran'})
    },
    makeStyle(bearing) {
      return {style: {transform: `rotate(${bearing})deg;`}}
    }
  }
}
</script>
