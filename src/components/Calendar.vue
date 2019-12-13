<template>
  <v-sheet>
    <BookForm ref="form" @submit="addEventFromForm"/>
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
import BookForm from './BookForm.vue'

export default Vue.extend({
  components: {
    BookForm
  },
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
    this.$refs.calendar.scrollToTime({ hour: 8, minute: 0 })
  },
  watch: {
    dt (newValue: DateTime, oldValue: DateTime) {
      this.value = newValue.toSQLDate()
    }
  },
  methods: {
    clickTime (event: ITimeEvent) {
      const { day, month, year, hour, minute } = event
      this.$refs.form.open(DateTime.fromObject({ day, month, year, hour, minute }))
    },
    minus () {
      this.dt = this.dt.minus({ week: 1 })
    },
    plus () {
      this.dt = this.dt.plus({ week: 1 })
    },
    today () {
      this.dt = this.now
    },
    addEventFromForm (ev: { start: DateTime; end: DateTime; owner: string }) {
      this.events.push({
        start: ev.start.toFormat('y-MM-dd HH-mm'),
        end: ev.start.toFormat('y-MM-dd HH-mm'),
        name: ev.owner
      })
    }
  }

})
</script>
