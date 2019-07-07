<template>
  <v-container grid-list-md>
    <v-layout
      row
      wrap
    >
      <v-flex md9>
        <v-expansion-panels
          multiple
          accordion
          :value="panel"
        >
          <v-expansion-panel value="true">
            <v-expansion-panel-header>
              <div>Stop Selection</div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <stop-map
                @stopSelected="updateSelectedStop"
                @closePane="closeMap"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel value="false">
            <v-expansion-panel-header>
              <div>Schedule by Stop</div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <stop-schedule
                :date="date"
                :routes="selectedRoutes"
                :stopid="selectedMarker"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel value="false">
            <v-expansion-panel-header>
              <div>Stop Statistics</div>
            </v-expansion-panel-header>
            <v-card />
          </v-expansion-panel>
        </v-expansion-panels>
      </v-flex>
      <v-flex md3>
        <v-autocomplete
          v-model="selectedRoutes"
          :items="routeList"
          clearable
          chips
          solo
          label="Routes"
          multiple
        />
        <v-menu
          v-model="datePickMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          full-width
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Select Date"
              prepend-icon="event"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker
            @input="datePickMenu = false"
            v-model="date"
            no-title
            scrollable
          />
        </v-menu>
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
      date: new Date().toISOString().substr(0, 10),
      selectedRoutes: [],
      datePickMenu: false
    }
  },
  methods: {
    updateSelectedStop (event) {
      this.selectedMarker = event
      this.$ga.event('InfoByStop', 'updateSelectedStop', 'updated', event)
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
