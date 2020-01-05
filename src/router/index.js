import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login.vue'
import personal from '@/views/personal.vue';
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/personal/:id',
    component: personal,
    name: 'personal'
  }]
})
// 导航首位  路由用的 就是个每次路由执行时触发的方法
router.beforeEach((to, from, next) => {
    //to and from are Route Object,next() must be called to resolve the hook}
    if (to.path.indexOf('/personal') === 0) {
      let token = localStorage.getItem('heimatoutiao')
      token ? next() : next({
        path: '/login'
      })
    } else next() // 如果是访问需要授权的页面且没有登陆过，则重向到登定陆页


  }

)



export default router