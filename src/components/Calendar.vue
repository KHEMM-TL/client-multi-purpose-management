<template>
  <v-sheet>
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

@Component
export default class Calendar extends Vue {
  data () {
    const now = DateTime.local().toSQLDate()
    return {
      now,
      events: []
    }
  }
  mounted () {
    (this.$refs.calendar as VCalendar).scrollToTime({ hour: 8, minute: 0 })
  }
  clickTime (day: ITimeEvent) {
    this.$emit('click:time', day)
  }
}
</script>
