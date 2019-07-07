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
          text
          v-model="mapSettings.closeAfterSelect"
        >
          Hide on Select
        </v-btn>
        <v-btn
          text
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
      <v-marker-cluster
        v-if="stopsLatLng.length"
        :options="{spiderfyOnMaxZoom: false, disableClusteringAtZoom: 17}"
      >
        <l-marker
          v-for="loc in stopsLatLng"
          :key="loc._id"
          :lat-lng="loc.loc"
          @click="updateSelectedMarker(loc)"
        >
          <l-icon :icon-anchor="[18, 36]">
            <v-icon
              color="red"
              large
            >
              place
            </v-icon>
          </l-icon>
          <l-popup @click="updateSelectedMarker">
            Name: {{ loc.name }} <br>
            Zone: {{ loc.zone_id }} <br>
            Code: {{ loc.code }} <br>
            ID: {{ loc.stop_id }}
          </l-popup>
        </l-marker>
      </v-marker-cluster>
      <l-tile-layer :url="url" />
    </l-map>
    <v-overlay
      :absolute="true"
      opacity=".7"
      v-if="loading"
    >
      <v-progress-circular
        indeterminate
        size="64"
      />
    </v-overlay>
  </div>
</template>
<script>
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
    'v-marker-cluster': Vue2LeafletMarkerCluster
  },
  async beforeMount () {
    this.loading = true
    if (!this.$store.state.stops.length) { await this.$store.dispatch('getStops') }
    this.loading = false
  },
  data () {
    return {
      url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 15,
      center: [33.158092, -117.350594],
      bounds: { _northEast: { lat: 0, lng: 0 }, _southWest: { lat: 0, lng: 0 } },
      selectedMarker: null,
      mapSettings: {
        closeAfterSelect: true,
        filterByStop: false
      },
      loading: false
    }
  },
  computed: {
    stopsLatLng: function () {
      let state = this.$store.state
      let out = []
      for (var stop of state.stops) {
        let lat = stop.stop_lat
        let lon = stop.stop_lon
        let loc = [lat, lon]
        let valid = true
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
