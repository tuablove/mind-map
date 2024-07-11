import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/icon-font/iconfont.css'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import i18n from './i18n'
import { getLang } from '@/api'
// import VConsole from 'vconsole'
// const vConsole = new VConsole()

Vue.config.productionTip = false
const bus = new Vue()
Vue.prototype.$bus = bus
Vue.use(ElementUI)
Vue.use(VueViewer)
const allowedDomainsObfuscated = ['bG9jYWxob3N0', 'MTI3LjAuMC4x', 'dGh3YW4uY29t'];
const deobfuscateDomain = (obfuscated) => {
  return atob(obfuscated);
};
const initApp = () => {
  const currentDomain = window.location.hostname;
  const isDomainAllowed = allowedDomainsObfuscated.some(obfuscatedDomain => {
    return deobfuscateDomain(obfuscatedDomain) === currentDomain;
  });
  if (!isDomainAllowed) {
    return;
  }
  i18n.locale = getLang()
  new Vue({
    render: h => h(App),
    router,
    store,
    i18n
  }).$mount('#app')
}

// 是否处于接管应用模式
if (window.takeOverApp) {
  window.initApp = initApp
  window.$bus = bus
} else {
  initApp()
}

