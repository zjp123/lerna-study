import Vue from 'vue';
import App from './index.vue';
import router from './router';
// import VueQuillEditor from 'vue-quill-editor';

// Vue.use(VueQuillEditor /* { default global options } */);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

