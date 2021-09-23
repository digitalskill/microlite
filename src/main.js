// Import Core Vue
import Vue from 'vue'
import App from './Microlite.vue'
import VueResource from "vue-resource";
import VueScrollTo from 'vue-scrollto';
import VueRouter from "vue-router";
import VueGtag from "vue-gtag";
import Meta from "vue-meta";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import FlagIcon from "vue-flag-icon";
import rellax from "rellax"
import {setup} from "./CMS/setup"

// Import App Items
import {routes} from "./routes";

// Import Vuex Store
import store from "./store/store";

Vue.config.productionTip = process.env.NODE_ENV === "production" ? false : true

// Import Languages
import i18n from "./CMS/languages"

// Setup Editor
if(process.env.NODE_ENV !== "production") {
  let VueQuillEditor = require('vue-quill-editor');
  let {Quill} = require('vue-quill-editor');
  //VueQuillEditor, {Quill} from 'vue-quill-editor');
  require('./assets/css/quill.snow.css');

  let Link = Quill.import('formats/link');

  class MyLink extends Link {
    static create(value) {
      let node = super.create(value);
      value = this.sanitize(value);
      node.setAttribute('href', value);
      node.removeAttribute('target');
      return node;
    }
  }
  Quill.register(MyLink);

  Vue.use(VueQuillEditor,
      {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'align': [] }],
            ['link','image','video'],
            ['clean'],
          ]
        }
      });
}

// Import Style Sheets
import './assets/css/main.min.css'
import './registerServiceWorker'


Vue.use(FlagIcon);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons)
Vue.use(Meta);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueScrollTo, {
  container: "body",
  duration: 250,
  easing: "ease",
  offset: 40,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true});

Vue.prototype.$rellax = rellax;

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
        if(to.path === from.path) {
          return {selector: to.hash}
        }
    }
    if (savedPosition || (to.name == from.name && to.hash == from.hash)) {
      return savedPosition
    } else {
      if (to.path != from.path) {
        return { x: 0, y: 0 };
      }
    }
  }
});

Vue.use(VueGtag, {
  config: {id: setup.google_tag},
  bootstrap: false,
}, router);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("render-event")),
}).$mount('#app')
