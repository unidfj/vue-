import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login.vue'
import personal from '@/views/personal.vue';
import editpersonal from '@/views/editpersonal.vue';
import index from '@/views/index.vue';
import articledetail from '@/views/articledetail.vue'
import follow from '@/views/follow.vue'
import star from '@/views/star.vue'
import comment from '../views/comment.vue';
import catemanager from '../views/catemanager.vue'
import {
  Search
} from 'vant';
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/',
      name: 'index',
      component: index
    }, {
      path: '/catemanager',
      name: 'catemanager',
      component: catemanager
    }, {
      path: '/comment/:id',
      name: 'comment',
      component: comment
    }, {
      path: '/star',
      name: 'star',
      component: star
    }, {
      path: '/follow',
      name: 'follow',
      component: follow
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/personal/:id',
      component: personal,
      name: 'personal'
    }, {
      path: '/editpersonal/:id',
      component: editpersonal,
      name: 'editpersonal'
    }, {
      path: '/articledetail/:id',
      component: articledetail,
      name: 'articledetail'
    },

  ],
})
// 导航首位  路由用的 就是个每次路由执行时触发的方法
router.beforeEach((to, from, next) => {
    if (to.path.indexOf('/personal') === 0) {
      let token = localStorage.getItem('heimatoutiao')
      token ? next() : next({
        path: '/login'
      })
    } else next() // 如果是访问需要授权的页面且没有登陆过，则重向到登定陆页


  }

)



export default router