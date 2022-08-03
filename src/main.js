import Vue from 'vue'
import App from './App.vue'
import {LMap, LTileLayer, LMarker, LIcon, LTooltip, LPolyline} from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import {Icon} from 'leaflet'
import Vue2LeafletRotatedMarker from 'vue2-leaflet-rotatedmarker'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.config.productionTip = false

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-icon', LIcon)
Vue.component('l-tooltip', LTooltip)
Vue.component('l-polyline', LPolyline)
Vue.component('l-rotated-marker', Vue2LeafletRotatedMarker)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
