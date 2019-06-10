<template>
  <div>
    <v-toolbar
      dense
      dark
    >
      <v-btn-toggle
        multiple
      >
        <v-btn
          flat
          v-model="mapSettings.closeAfterSelect"
        >
          Hide on Select
        </v-btn>
        <v-btn
          flat
          v-model="mapSettings.filterByStop"
        >
          Filter Routes
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
    <l-map
      style="height: 50vh; width: 100%; z-index: 1;"
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
        @click="updateSelectedMarker(loc)"
      >
        <l-popup @click="updateSelectedMarker">
          Name: {{ loc.name }} <br>
          Zone: {{ loc.zone_id }} <br>
          Code: {{ loc.code }} <br>
          ID: {{ loc.stop_id }}
        </l-popup>
      </l-marker>
      <l-tile-layer :url="url" />
    </l-map>
  </div>
</template>
<script>
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  async beforeMount () {
    await this.$store.dispatch('getStops')
  },
  data () {
    return {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 15,
      center: [48.751911, -122.478683],
      bounds: { _northEast: { lat: 0, lng: 0 }, _southWest: { lat: 0, lng: 0 } },
      selectedMarker: null,
      mapSettings: {
        closeAfterSelect: true,
        filterByStop: false
      }
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
            id: stop._id,
            name: stop.stop_name,
            zone_id: stop.zone_id,
            stop_id: stop.stop_id,
            code: stop.stop_code
          })
        }
      }
      return out
    }
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom
    },
    centerUpdated (center) {
      this.center = center
    },
    boundsUpdated (bounds) {
      this.bounds = bounds
    },
    updateSelectedMarker (event) {
      this.selectedMarker = event.id
      this.$emit('stopSelected', event.id)
      if (this.mapSettings.closeAfterSelect) {
        this.$emit('closePane')
      }
    }
  }
}
</script>
