import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Payment from '../pages/Payment'
import PaymentSuccess from '../pages/PaymentSuccess'
import History from '../pages/History'

Vue.use(VueRouter);

const router =  new VueRouter ({
  routes: [
    {
      path: '/',
      component: Payment
    },

    {
      path: '/success',
      component: PaymentSuccess,
      meta: {
        payment: true
      }
    },

    {
      path: '/history',
      component: History,
    },
  ],

  mode: 'history',

});

router.beforeEach((to, from, next) => {
  if (to.meta.payment && !(store.state.fromPayment)) {
    next('/')
  }
  else {
    next()
  }
});

export default router;
