import './assets/main.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('QuillEditor', QuillEditor)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
