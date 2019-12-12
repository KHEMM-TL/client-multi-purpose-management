<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Se connecter</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Identifiant" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Mot de passe" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="close">Fermer</v-btn>
          <v-btn color="blue" text @click="submit">Envoyer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { employee } from '@/api'
import { store } from '@/store'

export interface IAuthForm extends Vue {
  open(): void;
  close(): void;
}

@Component
export default class AuthForm extends Vue {
  private login!: string;
  private password!: string;
  private dialog!: boolean;

  data () {
    return {
      login: '',
      password: '',
      dialog: false
    }
  }

  open () {
    this.dialog = true
  }

  close () {
    this.dialog = false
  }

  submit () {
    this.close()
    // employee.auth(this.login, this.password)
    //   .then(token => {
    //     store.commit('setToken', token)
    //   })
  }
}
</script>

<style scoped>
</style>
