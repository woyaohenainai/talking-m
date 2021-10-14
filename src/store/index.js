import Vue from 'vue'
import Vuex from 'vuex'
// 封装本地存储
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const TALKING_KEY = 'TALKING_USER'
export default new Vuex.Store({
  state: {
    user: getItem(TALKING_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(TALKING_KEY, JSON.stringify(data))
    }
  },
  actions: {
  },
  modules: {
  }
})
