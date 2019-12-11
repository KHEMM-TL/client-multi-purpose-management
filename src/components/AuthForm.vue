<template>
  <form method="post" v-on:submit.prevent="submitAuth">
    <div>
      <label for="login">Login</label>
      <input type="text" name="login" v-model="login" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" name="password" v-model="password" />
    </div>
    <button type="submit">Envoyer</button>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { employee } from '@/api'
import { store } from '@/store'

interface ParamLogin {
  login: string;
  password: string;
}

@Component
export default class AuthForm extends Vue {
  private login!: string;
  private password!: string;

  data (): ParamLogin {
    return {
      login: '',
      password: ''
    }
  }

  submitAuth () {
    employee.auth(this.login, this.password)
      .then(token => {
        store.commit('setToken', token)
      })
  }
}
</script>

<style scoped>
</style>
