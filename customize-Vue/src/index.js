import Vue from "vue"
import Login from "./view/login.vue"
import "./css/index.scss"
import Element from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
// new Vue({
//     el:"#app",
//     components:{
//         Login
//     }
// })
Vue.use(Element)

new Vue({
    render:h => h(Login)
   
  }).$mount('#app')