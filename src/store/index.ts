import Vue from 'vue'
import Vuex from 'vuex'
import * as jwt from 'jsonwebtoken'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    setTokenFromLocalStorage (state) {
      state.token = localStorage.getItem('token') || ''
    },
    setToken (state, token) {
      localStorage.setItem('token', token)
      state.token = token
    }
  },
  getters: {
    login (state) {
      if (state.token) {
        const res = jwt.decode(state.token) as { login: string }
        return res.login
      }
      return ''
    }
  }
})
