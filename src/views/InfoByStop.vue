<template>
  <v-container grid-list-md>
    <v-layout
      row
      wrap
    >
      <v-flex xs10>
        <v-expansion-panel
          expand
          v-model="panel"
          popout
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
            <v-card />
          </v-expansion-panel-content>
          <v-expansion-panel-content value="false">
            <template v-slot:header>
              <div>Stop Statistics</div>
            </template>
            <v-card />
          </v-expansion-panel-content>
        </v-expansion-panel>
        Selected marker: {{ selectedMarker }}
      </v-flex>
      <v-flex>
        Hello
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import StopMap from '@/components/StopMap.vue'

export default {
  components: {
    StopMap
  },
  async beforeMount () {
    console.log('getting stops')
    await this.$store.dispatch('getStops')
  },
  data () {
    return {
      active: null,
      selectedMarker: null,
      panel: [1, 0, 0]
    }
  },
  methods: {
    updateSelectedStop (event) {
      console.log(event)
    },
    closeMap () {
      // close with set method because normal
      this.$set(this.panel, 0, false)
    }
  }

}
</script>
