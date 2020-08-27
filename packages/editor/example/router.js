import Vue from 'vue';
import VueRouter from 'vue-router';
// import {getLocalStorage,setLocalStorage} from "@/libs/utils";
import IndexPage from './index.vue';
// import QaDetail from '../views/question-detail.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'IndexPage',
    component: IndexPage
    // beforeEnter (to, from, next) {
    //   console.log('app route before enter');
    //   document.documentElement.scrollTop = 0;
    //   document.body.scrollTop = 0;
    //   next();
    // }
  }
];

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
  scrollBehavior: function (to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

export default router;
