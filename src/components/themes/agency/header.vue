<template>
  <b-navbar class="navbar-dark navbar-expand-lg fixed-top bg-dark"
            id="mainNav" toggleable="lg" >
    <div class="container">
      <div @click="totop()" class="navbar-brand pointer" ref="toplogo">
        <span>{{getsetup.brandname}}</span>
      </div>

      <button aria-controls="sidebar-border" aria-expanded="false" aria-label="Toggle navigation"
              class="navbar-toggler float-right collapsed mr-2"
              type="button"
              v-b-toggle.sidebar-border>
        <b-icon icon="list"></b-icon>
      </button>

      <b-sidebar id="sidebar-border"
                 class="d-lg-none bg-dark text-white"
                 no-header
                 backdrop
                 right>
        <div class="h-100">
          <div class="pb-3 pt-0">
            <router-link tag="b-navbar-brand" class="pb-5 pt-3 mt-3 text-center w-100 mr-0 ml-0" to="/">
              <span>{{getsetup.brandname}}</span>
              <span class="sr-only">{{getsetup.brandname}}</span>
            </router-link>
          </div>

          <div class="nav-container pt-3 mb-5">
            <b-navbar-nav class="nav navbar-nav ml-auto text-uppercase">
              <b-nav-item-dropdown class="w-100" right v-if="getLanguages.length > 0">
                <template v-slot:button-content>
                  <flag :iso="getFlag"/>
                  <span class="ml-1">{{ getLanguage }}</span>
                </template>
                <b-dropdown-item :key="lang.flag" @click.prevent="changeLanguage(lang)"
                                 v-for="lang in getLanguages">
                  <flag :iso="lang.flag"/>
                  <span class="ml-1">{{ lang.title }}</span>
                </b-dropdown-item>
              </b-nav-item-dropdown>
              <router-link
                  v-for="page in getPages.sort((a,b) => {
                    return a.sidenav.order > b.sidenav.order ? 1 : -1
                  }).filter( p => { return p.sidenav.show})" :key="page.name"
                  :to="{ name: page.name }"
                  active-class="active"
                  exact
                  tag="b-nav-item">
                <span v-text="$t(page.datapage + '.menu')"></span>
                <span class="sr-only" v-text="$t(page.datapage + '.menu')"></span>
              </router-link>
            </b-navbar-nav>
          </div>

          <div class="social pb-3">
            <ul class="list-inline">
              <li class="list-inline-item footer-facebook">
                <a target="_blank" rel="noreferrer" href="https://www.facebook.com/vueshop/">
                  <span class="sr-only">Facebook</span></a></li>
              <li class="list-inline-item footer-twitter"><a target="_blank" rel="noreferrer"
                                                             href="https://twitter.com/vueshop">
                <span class="sr-only">Twitter</span></a></li>
              <li class="list-inline-item footer-linkedin"><a target="_blank" rel="noreferrer"
                                                              href="https://www.linkedin.com/company/vueshop.com/">
                <span class="sr-only">Linkedin</span></a></li>
              <li class="list-inline-item footer-instagram"><a target="_blank" rel="noreferrer"
                                                               href="https://www.instagram.com/vueshop/">
                <span class="sr-only">Instagram</span></a></li>
            </ul>
          </div>
        </div>
      </b-sidebar>

      <b-collapse class="navbar-slide" id="navbarNav" is-nav>
        <ul class="nav navbar-nav text-uppercase ml-auto">
          <li class="nav-item"
              :class="$route.hash.replace('#','') == page.name ? 'active' : ''"
              v-for="page in getTopNavPages" :key="'anchor' + page.name">
            <router-link :to="{ path: page.pagepath || page.path, hash: page.hash  }" class="nav-link">
              <span v-text="$t(page.datapage + '.menu')"></span>
              <span class="sr-only" v-text="$t(page.datapage + '.menu')"></span>
            </router-link>
          </li>

          <b-dropdown right v-if="getLanguages.length > 0">
            <template v-slot:button-content
                      aria-haspopup="true"
                      aria-expanded="false">
              <flag :iso="getFlag"/>
              <span class="ml-1">{{ getLanguage }}</span>
            </template>
            <b-dropdown-item :key="lang.flag" @click.prevent="changeLanguage(lang)"
                             v-for="lang in getLanguages">
              <flag :iso="lang.flag"/>
              <span class="ml-1 ms-1">{{ lang.title }}</span>
            </b-dropdown-item>
          </b-dropdown>
        </ul>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import globalmixin from "@/utils/globalmixin";
import {setup} from "@/CMS/setup";

export default {
  name: "Header",
  mixins:[globalmixin],
  data() {
    return {
      routes: this.$router.options.routes,
      cookieName: 'cookieconsent_status',
      getsetup: setup
    }
  },
  methods: {
    getCookie() {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${this.cookieName}=`)
      return parts.length !== 2 ?
          undefined :
          parts.pop().split(';').shift()
    },
    checkCookie() {
      if (this.getCookie()) {
        this.firstload = false;
      }
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang.language;
      localStorage.setItem('language', this.$i18n.locale)
    },
    getCartSize() {
      return this.$store.getters.getCart.length;
    },
    totop() {
      if(this.$route.path != "/") {
        this.$router.push({path: "/"});
      } else {
        this.$router.push({path: "/"});
      }
      this.$refs.toplogo.blur();
      scrollTo(0,0);
    }
  },
  computed: {
    getTopNavPages(){
      let pages  = this.getPages;
      pages = pages.sort((a,b) => {
        return a.innav.order > b.innav.order ? 1 : -1
      }).filter( p => {
        return (p.innav.show !== false && p.innav.show !== "false")
      });

      let paths = {};
      this.getPages.forEach(page => {
        paths[page.name] = {path: page.path}
      })

      pages.forEach( p => {
        p.onpage.forEach(op => {
          if(paths[op.page] && op.page != ''){
            p.pagepath = paths[op.page].path;
            p.hash = p.name
          }
        });
      });
      return pages;
    },
    getLanguages() {
      return this.$i18n.messages;
    },
    version() {
      return process.env.VUE_APP_VERSION;
    },
    production() {
      return process.env.NODE_ENV === 'development';
    },
    getFlag() {
      if(this.$i18n.messages[this.$i18n.locale]) {
        return this.$i18n.messages[this.$i18n.locale].flag
      }
      return 'nz';
    },
    getLanguage() {
      return this.$i18n.locale;
    }
  },
  created() {
    let blang = localStorage.getItem('language') || window.navigator.userLanguage || window.navigator.language;
    blang = blang.split('-');
    this.$i18n.locale = blang[0];
  },
}
</script>
