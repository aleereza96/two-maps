<template>
  <div style="display: flex; justify-content: center">
    <l-map
      style="height: 450px; width: 500px"
      :zoom="zoom"
      :bounds="bounds"
      :options="{zoomControl: false, dragging: false, scrollWheelZoom: false}"
    >
      <l-tile-layer :url="url" :attribution="attribution" />

      <l-marker v-for="(marker, index) in markers" :key="index" :lat-lng="[marker.lat, marker.lon]">
        <l-icon :icon-size="[10, 15]" :iconAnchor="[0, 0]" :popupAnchor="[0, -35]" :tooltipAnchor="[0, -35]">
          <img src="../assets/car_topview.svg" alt="marker" v-bind="makeStyle(marker.bearing)" />
        </l-icon>

        <l-tooltip :options="{direction: 'top'}">
          {{ getDate(marker.timestamp) }}
        </l-tooltip>
      </l-marker>

      <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
    </l-map>
  </div>
</template>

<script>
export default {
  name: 'SimlpeMap',
  props: ['bounds', 'markers'],
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 14,
      center: [47.41322, -1.219482],
      polyline: {
        latlngs: this.bounds,
        color: 'green'
      }
    }
  },
  methods: {
    getDate(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleString('fa-FA', {timeZone: 'Asia/Tehran'})
    },
    makeStyle(bearing) {
      return {style:{transform: `rotate(${bearing})deg;`}}
    }
  }
}
</script>
