import Vue from 'vue'
import App from './App.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'


Vue.use(ElementUI);
Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue()
new Vue({
  render: h => h(App),
}).$mount('#app')
