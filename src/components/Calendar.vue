<template>
  <v-sheet>
    <BookForm ref="form" @submit="addEventFromForm"/>
    <v-row>
      <v-col sm="12" lg="1" class="mb-4 constrols">
        <v-select v-model="type" :items="typeOptions" label="Affichage"></v-select>
      </v-col>
      <v-col sm="12" lg="11" class="pl-4">
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
        event-color="color"
        event-height="40px"
        :type="type"
        :short-weekdays="false"
        @click:time="clickTime"
      >
        </v-calendar>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Prop, Vue, Component } from 'vue-property-decorator'
import { DateTime } from 'luxon'
import { ITimeEvent, VCalendar } from '@/components'
import { mdiChevronLeft, mdiChevronRight, mdiCalendarToday } from '@mdi/js'
import BookForm from './BookForm.vue'

type calendarType = 'day' | 'week' | 'month';

interface CalendarDuration {
  days?: number;
  weeks?: number;
  month?: number;
}

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
      events: [],
      typeOptions: [
        { text: 'Jour', value: 'day' },
        { text: 'Semaine', value: 'week' },
        { text: 'Mois', value: 'month' }
      ],
      type: 'week' as calendarType
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
    getDuration (): CalendarDuration {
      const duration: CalendarDuration = { }
      switch (this.type) {
        case 'day':
          duration.days = 1
          break
        case 'week':
          duration.weeks = 1
          break
        case 'month':
          duration.month = 1
      }
      return duration
    },
    minus () {
      this.dt = this.dt.minus(this.getDuration())
    },
    plus () {
      this.dt = this.dt.plus(this.getDuration())
    },
    today () {
      this.dt = this.now
    },
    addEventFromForm (ev: { start: DateTime; end: DateTime; owner: string }) {
      console.log()
      this.events.push({
        start: ev.start.toFormat('y-MM-dd T'),
        end: ev.start.toFormat('y-MM-dd T'),
        name: ev.owner
      })
    }
  }

})
</script>
