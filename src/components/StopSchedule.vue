<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="departures"
      class="elevation-1"
      :pagination.sync="pages"
      :loading="loading"
      disable-initial-sort
    >
      <template v-slot:items="props">
        <td :class="{'grey': props.item.hourAlternate, 'darken-2': props.item.hourAlternate}">
          {{ props.item.routeName }}
        </td>
        <td
          class="text"
          :class="{'grey': props.item.hourAlternate, 'darken-2': props.item.hourAlternate}"
        >
          {{ props.item.tripHeadsign }}
        </td>
        <td
          class="text"
          :class="{'grey': props.item.hourAlternate, 'darken-2': props.item.hourAlternate}"
        >
          {{ props.item.time }}
        </td>
        <td
          class="text-xs-right"
          :class="{'grey': props.item.hourAlternate, 'darken-2': props.item.hourAlternate}"
        >
          {{ props.item.spacing }}
        </td>
        <td
          class="icon"
          :class="{'grey': props.item.hourAlternate, 'darken-2': props.item.hourAlternate}"
        >
          <v-icon
            color="green"
            v-if="props.item.frequentService"
          >
            check_circle_outline
          </v-icon>
          <v-icon
            color="red"
            v-if="!props.item.frequentService"
          >
            highlight_off
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ['stopid', 'date'],
  data () {
    return {
      loading: false,
      pages: {
        // descending: boolean,
        // page: number,
        rowsPerPage: 25 // -1 for All
      },
      headers: [
        {
          text: 'Route',
          align: 'left',
          sortable: false,
          value: 'routeName'
        },
        { text: 'Destination',
          align: 'left',
          sortable: false,
          value: 'tripHeadsign' },
        { text: 'Time',
          align: 'left',
          value: 'time' },
        { text: 'Spacing',
          align: 'left',
          sortable: false,
          value: 'spacing' },
        { text: 'Frequent Service',
          align: 'center',
          sortable: false,
          value: 'frequentService' }
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
      this.loading = true
      await this.$store.dispatch('getDepartures', { stop: newStop, date: this.date })
      this.loading = false
    },
    date: async function (newDate) {
      this.loading = true
      await this.$store.dispatch('getDepartures', { stop: this.stopid, date: this.date })
      this.loading = false
    }
  },
  async beforeMount () {
    // await this.$store.dispatch('getDepartures', { stop: this.stopId, date: '2019-06-11' })
  }
}
</script>
