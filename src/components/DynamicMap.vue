<template>
  <div style="display: flex; justify-content: center; margin-top: 2rem">
    <l-map
      style="height: 450px; width: 500px; display: flex; justify-content: center"
      ref="dyMap"
      :zoom="zoom"
      :bounds="initialBounds"
      @update:bounds="boundsUpdated"
    >
      <l-control-fullscreen position="topleft" :options="{title: {false: 'Go big!', true: 'Be regular'}}" />

      <l-tile-layer :url="url" />

      <l-rotated-marker
        v-for="(marker, index) in markersWithPrecision"
        :key="index"
        :lat-lng="[marker.lat, marker.lon]"
        :rotationAngle="marker.bearing"
      >
        <l-icon :icon-size="[20, 25]" :iconAnchor="[0, 0]" :popupAnchor="[0, -35]" :tooltipAnchor="[0, -35]">
          <img src="../assets/car_topview.svg" alt="marker" />
        </l-icon>

        <l-tooltip :options="{direction: 'top'}">
          {{ getDate(marker.timestamp) }}
        </l-tooltip>
      </l-rotated-marker>

      <l-polyline :lat-lngs="initialBounds" color="green"></l-polyline>
    </l-map>
  </div>
</template>

<script>
export default {
  name: 'DynamicMap',
  props: ['markers', 'initialBounds', 'decimal'],
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
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
    markersWithPrecision() {
      const rounded = this.getMarkers.map((item) => {
        const shallowItem = {...item}
        shallowItem.lat = this.makeNumWithPrecision(shallowItem.lat)
        shallowItem.lon = this.makeNumWithPrecision(shallowItem.lon)
        return shallowItem
      })
      return [...new Map(rounded.map((v) => [JSON.stringify([v.lat, v.lon]), v])).values()]
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
    makeNumWithPrecision(num) {
      if (!num.toString().includes('.')) return num
      const numParts = num.toString().split('.')
      const firstPart = numParts[0]
      const secondPart = numParts[1].slice(0, this.decimal)
      return Number([firstPart, secondPart].join().replace(',', '.'))
    }
  }
}
</script>
