<template>
  <v-sheet>
    <v-card class="d-flex justify-space-between mb-6" flat tile>
      <div class="pa-2">
        <v-btn large @click="minus">
          <v-icon>{{ mdiChevronLeft }}</v-icon>
        </v-btn>
      </div>
      <div class="pa-2" @click="today">
        <v-btn large>
          <v-icon>{{ mdiCalendarToday }}</v-icon>
        </v-btn>
      </div>
      <div class="pa-2">
        <v-btn large @click="plus">
          <v-icon>{{ mdiChevronRight }}</v-icon>
        </v-btn>
      </div>
    </v-card>
    <v-calendar
      ref="calendar"
      :now="now.toSQLDate()"
      :value="value"
      :events="events"
      color="primary"
      type="week"
      :short-weekdays="false"
      @click:time="clickTime"
    >
  </v-calendar>
  </v-sheet>
</template>

<script lang="ts">
import { Prop, Vue, Component } from 'vue-property-decorator'
import { DateTime } from 'luxon'
import { ITimeEvent, VCalendar } from '@/components'
import { mdiChevronLeft, mdiChevronRight, mdiCalendarToday } from '@mdi/js'

export default Vue.extend({

  data () {
    const dt = DateTime.local()
    return {
      mdiChevronLeft,
      mdiChevronRight,
      mdiCalendarToday,
      dt,
      now: dt,
      value: dt.toSQLDate(),
      events: []
    }
  },
  mounted () {
    (this.$refs.calendar as VCalendar).scrollToTime({ hour: 8, minute: 0 })
  },
  watch: {
    dt (newValue: DateTime, oldValue: DateTime) {
      this.value = newValue.toSQLDate()
    }
  },
  methods: {
    clickTime (day: ITimeEvent) {
      this.$emit('click:time', day)
    },
    minus () {
      this.dt = this.dt.minus({ week: 1 })
    },
    plus () {
      this.dt = this.dt.plus({ week: 1 })
    },
    today () {
      this.dt = this.now
    }
  }

})
</script>
