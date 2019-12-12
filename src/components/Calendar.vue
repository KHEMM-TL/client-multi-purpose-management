<template>
  <v-sheet>
    <v-card class="d-flex flex-row-reverse" flat tile>
      <div class="pa-2">
        <v-btn large>
          <v-icon>{{ mdiChevronRight }}</v-icon>
        </v-btn>
      </div>
      <div class="pa-2">
        <v-btn @click="minus" large>
          <v-icon>{{ mdiChevronLeft }}</v-icon>
        </v-btn>
      </div>
    </v-card>
    <v-calendar
      ref="calendar"
      :now="now"
      :value="now"
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
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'

@Component
export default class Calendar extends Vue {
  private dt!: DateTime;

  data () {
    const dt = DateTime.local()
    return {
      now: this.dt.toSQLDate(),
      dt,
      events: []
    }
  }
  get mdiChevronLeft (): string {
    return mdiChevronLeft
  }
  get mdiChevronRight (): string {
    return mdiChevronRight
  }
  get start (): string {
    return this.dt.set({ weekday: 1 }).toSQLDate()
  }
  get end (): string {
    return this.dt.set({ weekday: 7 }).toSQLDate()
  }
  get value (): string {
    return this.dt.toSQLDate()
  }
  mounted () {
    (this.$refs.calendar as VCalendar).scrollToTime({ hour: 8, minute: 0 })
  }
  clickTime (day: ITimeEvent) {
    this.$emit('click:time', day)
  }
  minus () {
    this.dt.minus({ week: 1 })
  }
}
</script>
