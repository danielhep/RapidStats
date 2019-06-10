<template>
  <v-container>
    <l-map
      style="height: 50vh; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-marker
        v-for="loc in stopsLatLng"
        :key="loc._id"
        :lat-lng="loc.loc"
      >
        <l-popup>
          h
        </l-popup>
      </l-marker>
      <l-tile-layer :url="url" />
    </l-map>
  </v-container>
</template>
<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  async beforeMount () {
    console.log('getting stops')
    await this.$store.dispatch('getStops')
  },
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 15,
      center: [48.751911, -122.478683],
      bounds: { _northEast: { lat: 0, lng: 0 }, _southWest: { lat: 0, lng: 0 } }
    }
  },
  computed: {
    stopsLatLng: function () {
      let state = this.$store.state
      let out = []
      for (var stop of state.stops) {
        let bounds = this.bounds
        let lat = stop.stop_lat
        let lon = stop.stop_lon
        let loc = [lat, lon]
        let valid = true
        if (!(lat < bounds._northEast.lat && lat > bounds._southWest.lat)) valid = false
        if (!(lon < bounds._northEast.lng && lon > bounds._southWest.lng)) valid = false
        if (valid) {
          out.push({
            loc,
            id: stop._id
          })
          // }
        }
      }
      return out
    }
  },
  // computed: mapState(['stops']),
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom
    },
    centerUpdated (center) {
      this.center = center
    },
    boundsUpdated (bounds) {
      this.bounds = bounds
    }
  }

}
</script>
