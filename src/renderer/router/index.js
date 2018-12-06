import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'game',
      component: require('@/components/Game').default
    },
    {
      path: '/game',
      name: 'game',
      component: require('@/components/Game').default
    },
    {
      path: '/connect',
      name: 'connect',
      component: require('@/components/Connect').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
