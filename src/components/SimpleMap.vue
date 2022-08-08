<template>
  <div style="display: flex; justify-content: center">
    <l-map style="height: 70vh; width: 70vw" :zoom="zoom" :bounds="bounds">
      <l-control-fullscreen position="topleft" :options="{title: {false: 'Go big!', true: 'Be regular'}}" />

      <l-tile-layer :url="url" />

      <l-rotated-marker
        v-for="(marker, index) in optimizedMarkers"
        :key="index"
        :lat-lng="[marker.lat, marker.lon]"
        :rotationAngle="marker.bearing"
      >
        <l-icon
          v-if="index == 0"
          :icon-size="[20, 25]"
          :iconAnchor="[0, 0]"
          :popupAnchor="[0, -35]"
          :tooltipAnchor="[0, -35]"
        >
          <img src="../assets/car_topview_red.svg" alt="marker" />
        </l-icon>

        <l-icon
          v-else-if="index === optimizedMarkers.length - 1"
          :icon-size="[20, 25]"
          :iconAnchor="[0, 0]"
          :popupAnchor="[0, -35]"
          :tooltipAnchor="[0, -35]"
        >
          <img src="../assets/car_topview_green.svg" alt="marker" />
        </l-icon>

        <l-icon v-else :icon-size="[20, 25]" :iconAnchor="[0, 0]" :popupAnchor="[0, -35]" :tooltipAnchor="[0, -35]">
          <img src="../assets/car_topview.svg" alt="marker" />
        </l-icon>
        <l-tooltip :options="{direction: 'top'}">
          {{ getDate(marker.timestamp) }}
        </l-tooltip>
      </l-rotated-marker>

      <l-polyline :lat-lngs="polyline.latlngs" :color="polyline.color"></l-polyline>
    </l-map>
  </div>
</template>

<script>
export default {
  name: 'SimpleMap',
  props: ['bounds', 'markers', 'distance', 'showIcons'],
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 13,
      center: [47.41322, -1.219482],
      polyline: {
        latlngs: this.bounds,
        color: 'green'
      }
    }
  },
  computed: {
    optimizedMarkers() {
      if (!this.showIcons) return []
      if (!this.distance) return this.markers
      let optMarkers = [this.markers[0]]
      this.findDistantPoints(this.markers, optMarkers)

      return optMarkers
    }
  },
  methods: {
    findDistantPoints(array, secondArray) {
      if (array.length) {
        const initialValue = array[0]
        const firstDistant = array.find((item) => {
          if (this.getDistanceFromLatLon(initialValue.lat, initialValue.lon, item.lat, item.lon) > this.distance)
            return item
        })
        if (firstDistant) {
          secondArray.push(firstDistant)
          const newArr = array.slice(array.indexOf(firstDistant))
          this.findDistantPoints(newArr, secondArray)
        }
      }
    },
    getDate(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleString('fa-FA', {timeZone: 'Asia/Tehran'})
    },
    getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
      const R = 6371000
      const dLat = this.deg2rad(lat2 - lat1)
      const dLon = this.deg2rad(lon2 - lon1)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const d = R * c
      return d
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180)
    }
  }
}
</script>
