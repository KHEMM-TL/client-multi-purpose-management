<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg=msg />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { store } from '@/store'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  computed: {
    msg () {
      return `Bonjour ${store.getters.login} !`
    }
  }
}
</script>
