// import MyEditor from './editor.vue'
 
// 这一步判断window.Vue是否存在，因为直接引用vue.min.js， 它会把Vue绑到Window上，我们直接引用打包好的js才能正常跑起来。
// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.component(MyEditor.name, MyEditor)
// }
// //这样就可以使用Vue.use进行全局安装了。
// MyEditor.install = function(Vue){
//   Vue.component(MyEditor.name, MyEditor)
// }
// export default MyEditor


import MyEditor from './editor.vue'
// import _Vue from 'vue'

MyEditor.install = Vue => {
  // if (!Vue) {
  //   window.Vue = Vue = _Vue
  // }
  Vue.component(MyEditor.name, MyEditor)
}
export default MyEditor;