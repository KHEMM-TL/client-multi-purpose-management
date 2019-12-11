<template>
  <div>
    <AuthForm v-if="!token" />
  </div>
</template>

<script lang="ts">
import AuthForm from '@/components/AuthForm.vue'
import { store } from '@/store'

export default {
  name: 'employee',
  components: {
    AuthForm
  },
  computed: {
    token () {
      return store.state
    }
  }
}
</script>
