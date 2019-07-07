<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Rapid</span>
        <span class="font-weight-light">Statistics</span>
      </v-toolbar-title>
      <v-spacer />

      <v-menu
        light
        :nudge-width="100"
      >
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <span>{{ currentAgency.agency_name }}</span>
            <v-icon dark>
              arrow_drop_down
            </v-icon>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-tile
            v-for="item in agencies"
            :key="item._id"
            @click="setCurrentAgency(item)"
          >
            <v-list-tile-title v-text="item.agency_name" />
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn
        href="https://danielheppner.com"
        target="_blank"
      >
        <span class="mr-2">Daniel Heppner</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  },
  async beforeMount () {
    if (!this.$store.state.agencies.length) {
      await this.$store.dispatch('getAgencies')
      this.$store.commit('setCurrentAgency', this.$store.state.agencies[0])
    }
  },
  methods: {
    setCurrentAgency (agency) {
      this.$store.commit('setCurrentAgency', agency)
    }
  },
  computed: {
    agencies () {
      return this.$store.state.agencies
    },
    currentAgency () {
      return this.$store.state.currentAgency
    }
  }
}
</script>
