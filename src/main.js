import { createSSRApp} from "vue";

import * as Pinia from 'pinia';

//将pinia持久化插件添加到pinia实例上
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //导入pinia持久化插件
const pinia = createPinia()

import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
    app.use(Pinia.createPinia());
		app.use(pinia.use(piniaPluginPersistedstate)); //pinia插件的安装配置（千万别忘了这步！！！）
	// 封装的展示消息提示的方法
    uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
	uni.showToast({
	  title,
	  duration,
	  icon: 'none',
	})
  }
	return {
		app,
		Pinia,
		uni
	};
}
