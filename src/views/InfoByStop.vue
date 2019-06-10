<template>
  <v-container>
    <stop-map @stopSelected="updateSelectedStop" />
    Selected marker: {{ selectedMarker }}
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
      selectedMarker: null
    }
  },
  methods: {
    updateSelectedStop (event) {
      console.log(event)
    }
  }

}
</script>
