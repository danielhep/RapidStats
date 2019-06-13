<template>
  <v-container grid-list-md>
    <v-layout
      row
      wrap
    >
      <v-flex xs9>
        <v-expansion-panel
          expand
          :value="panel"
        >
          <v-expansion-panel-content value="true">
            <template v-slot:header>
              <div>Stop Selection</div>
            </template>
            <v-card>
              <stop-map
                @stopSelected="updateSelectedStop"
                @closePane="closeMap"
              />
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content value="false">
            <template v-slot:header>
              <div>Schedule by Stop</div>
            </template>
            <v-card>
              <stop-schedule :stopid="selectedMarker" />
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content value="false">
            <template v-slot:header>
              <div>Stop Statistics</div>
            </template>
            <v-card />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex xs3>
        <v-select
          v-model="selectedRoutes"
          :items="routeList"
          clearable
          chips
          solo
          label="Routes"
          multiple
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import StopMap from '@/components/StopMap.vue'
import StopSchedule from '@/components/StopSchedule.vue'

export default {
  components: {
    StopMap,
    StopSchedule
  },
  async beforeMount () {
    console.log('getting stops')
    await this.$store.dispatch('getStops')
    await this.$store.dispatch('getRoutes')
  },
  data () {
    return {
      active: null,
      selectedMarker: null,
      panel: [1, 1, 0],
      selectedRoutes: []
    }
  },
  methods: {
    updateSelectedStop (event) {
      console.log(event)
      this.selectedMarker = event
    },
    closeMap () {
      // close with set method because normal
      this.$set(this.panel, 0, false)
    }
  },
  computed: {
    routeList () {
      let routes = this.$store.state.routes
      let list = []
      routes.forEach((route) => {
        list.push({
          text: route.route_short_name,
          value: route._id
        })
      })
      return list
    }
  }

}
</script>
