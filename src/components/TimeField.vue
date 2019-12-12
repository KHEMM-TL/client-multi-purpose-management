<template>
  <v-menu
    ref="menu"
    v-model="menu2"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="time"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
    :required="required"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="time"
        :label=label
        :prepend-icon="mdiClockOutline"
        readonly
        v-on="on"
        :rules="rules"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu2"
      v-model="time"
      full-width
      @click:minute="$refs.menu.save(time)"
      format="24hr"
    ></v-time-picker>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { mdiClockOutline } from '@mdi/js'

export default Vue.extend({
  name: 'TimeField',
  props: {
    label: String,
    rules: [],
    required: Boolean
  },
  watch: {
    time () {
      this.$emit('input', this.time)
    }
  },
  data () {
    return {
      time: '',
      menu2: false,
      modal2: false,
      mdiClockOutline
    }
  }
})
</script>
