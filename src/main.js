import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';

// 创建一个 Vue 应用实例
const app = createApp(App);

// 使用 ElementPlus 插件
app.use(ElementPlus);
// 挂载应用实例到 DOM
app.mount('#app');
