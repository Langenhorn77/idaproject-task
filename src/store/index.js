import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    currentTransaction: {
      bill: '',
      sum: '',
      name: '',
      date: ''
    },

    transactionArray: [],

    fromPayment: false,
  },

  actions: {
    setCurrentTransaction(context, payload) {
      context.commit('SET_CURRENT_TRANSACTION', payload)
    },

    reloadTransArray(context, payload) {
      context.commit('RELOAD_TRANSACTION_ARRAY', payload)
    },

    acceptTransition(context) {
      context.commit('ACCEPT_TRANSITION')
    },

    denyTransition(context) {
      context.commit('DENY_TRANSITION')
    },
  },

  mutations: {
    SET_CURRENT_TRANSACTION(state, payload) {
      state.currentTransaction.bill = payload.bill;
      state.currentTransaction.sum = payload.sum;
      state.currentTransaction.name = payload.name;
      state.currentTransaction.date = payload.date;
    },

    RELOAD_TRANSACTION_ARRAY(state, payload) {
      let arr = {};
      arr.bill = payload.bill;
      arr.sum = payload.sum;
      arr.name = payload.name;
      arr.date = payload.date;
      state.transactionArray.push(arr)
    },

    ACCEPT_TRANSITION(state) {
      state.fromPayment = true
    },

    DENY_TRANSITION(state) {
      state.fromPayment = false
    }
  },

  getters: {
    cTransaction(state) {
      return state.currentTransaction
    },

    tArray(state) {
      return state.transactionArray
    },

    transition(state) {
      return state.fromPayment
    }
  }
});

export default store
