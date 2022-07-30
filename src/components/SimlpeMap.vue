<template>
  <div style="display: flex; justify-content: center">
    <l-map
      style="height: 450px; width: 500px"
      :zoom="zoom"
      :bounds="bounds"
      :options="{zoomControl: false, dragging: false, scrollWheelZoom: false}"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker v-for="(marker, index) in markers" :key="index" :lat-lng="marker" />
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
      center: [47.41322, -1.219482]
    }
  }
}
</script>
