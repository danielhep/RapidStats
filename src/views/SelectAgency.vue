<template>
  <v-container>
    <v-container
      fluid
      fill-height
    >
      <v-layout
        align-center
        justify-center
      >
        <v-flex
          xs12
          sm8
          md4
        >
          <v-card class="elevation-12">
            <v-toolbar
              dark
              color="primary"
            >
              <v-toolbar-title>Select Agency</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-select
                :items="agencies"
                filled
                label="Select an Agency"
                item-text="agency_name"
                item-value="_id"
                @change="setCurrentAgency"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                :to="{name: 'InfoByStop', params: {agency: currentAgency.agency_key}}"
                color="primary"
                :disabled="!agencySet"
              >
                Info By Stop
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      agencySet: false
    }
  },
  async beforeMount () {
    if (!this.$store.state.agencies.length) {
      await this.$store.dispatch('getAgencies')
    }
  },
  methods: {
    setCurrentAgency (agency) {
      this.$store.commit('setCurrentAgency', agency)
      this.agencySet = true
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
