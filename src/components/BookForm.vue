<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">Pré-Réservation {{ strDate }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="lastname" label="Nom"></v-text-field>
            <v-text-field v-model="name" label="Prénom"></v-text-field>
            <v-text-field v-model="association" label="Association"></v-text-field>
            <v-row>
              <v-col cols="auto">
                <v-subheader>Heure réservation</v-subheader>
              </v-col>
              <v-col cols="4">
                <TimeField v-model="start" label="Début" :rules="startRule" required />
              </v-col>
              <v-col cols="4">
                <TimeField v-model="end" label="Fin" :rules="endRule" required />
              </v-col>
            </v-row>
            <v-text-field v-model="nbPerson" type="number" label="Nombre de participant" min="1"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="close">Fermer</v-btn>
          <v-btn :disabled="!valid" color="blue" text @click="submit">Envoyer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { DateTime } from 'luxon'
import TimeField from './TimeField.vue'

export default Vue.extend({
  name: 'BookForm',
  components: {
    TimeField
  },
  data () {
    const mustExist = (v: unknown) => !!v || 'This field is required'
    return {
      start: '',
      end: '',
      lastname: '',
      name: '',
      association: '',
      dialog: false,
      strDate: '',
      date: DateTime.local(),
      nbPerson: 1,
      startRule: [mustExist],
      endRule: [mustExist],
      nbPersonRule: [mustExist]
    }
  },
  watch: {
    date (newValue: DateTime, oldValue: DateTime) {
      this.strDate = newValue.setLocale('fr').toFormat('DDDD')
    }
  },
  computed: {
    valid (): boolean {
      const names = this.lastname && this.name
      if (!(names || this.association)) {
        return false
      }
      return this.start.length && this.end && this.nbPerson
    }
  },
  methods: {
    serializeTime (str: string): DateTime {
      const [hour, minute] = str.split(':')
      return this.date.set({ hour: parseInt(hour), minute: parseInt(minute) })
    },
    open (date: DateTime) {
      this.date = date
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    submit () {
      if (!this.valid) {
        return
      }
      const start = this.serializeTime(this.start)
      const end = this.serializeTime(this.end)
      const name = this.name[0].toUpperCase() + this.name.substr(1).toLowerCase()
      this.$emit('submit', { start, end, owner: this.association || `${this.lastname.toUpperCase()} ${name}` })
      this.close()
    }
  }
})
</script>
