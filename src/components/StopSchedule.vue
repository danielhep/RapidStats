<template>
  <div>
    {{ stopid }}
    <v-data-table
      :headers="headers"
      :items="departures"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.routeName }}</td>
        <td class="text-xs-right">
          {{ props.item.tripHeadsign }}
        </td>
        <td class="text-xs-right">
          {{ props.item.time }}
        </td>
        <td class="text-xs-right">
          {{ props.item.spacing }}
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ['stopid'],
  data () {
    return {
      headers: [
        {
          text: 'Route',
          align: 'left',
          value: 'routeName'
        },
        { text: 'Destination', value: 'tripHeadsign' },
        { text: 'Time', value: 'time' },
        { text: 'Spacing', value: 'spacing' }
      ]
    }
  },
  computed: {
    departures () {
      return this.$store.state.departures
    }
  },
  watch: {
    stopid: async function (newStop) {
      console.log('new stop selected')
      await this.$store.dispatch('getDepartures', { stop: newStop, date: '2019-06-11' })
    }
  },
  async beforeMount () {
    // await this.$store.dispatch('getDepartures', { stop: this.stopId, date: '2019-06-11' })
  }
}
</script>
