<template>
  <b-navbar class="navbar-dark navbar-expand-lg fixed-top bg-dark"
            id="mainNav" toggleable="lg">
    <div class="container">
      <router-link v-if="getCartSize() > 0"
                   class="cart d-lg-none position-static"
                   role="menuitem"
                   to="/Cart">
        <span class="sr-only">Cart</span>
        <div class="text-blue d-inline-block bg-light text-center small rounded-pill mr-1 pl-2 pr-2"
             v-if="getCartSize() > 0"
             v-text="getCartSize()">(0)
        </div>
        <i class="fa fa-shopping-cart"></i>
      </router-link>

      <div @click="totop()" class="navbar-brand" ref="toplogo">
        <span v-text="$t('sitename')"></span>
        <span class="sr-only" v-text="$t('sitename')"></span>
      </div>

      <button aria-controls="sidebar-border" aria-expanded="false" aria-label="Toggle navigation"
              class="navbar-toggler float-right collapsed"
              type="button"
              v-b-toggle.sidebar-border
              style="z-index: 1040;">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <b-sidebar id="sidebar-border"
                 class="d-lg-none"
                 no-header
                 backdrop
                 right>
        <div class="h-100">
          <div class="bg-light pb-3 pt-0">
            <router-link tag="b-navbar-brand" class="pb-5 pt-3 mt-3" to="/">
              <span class="sr-only" v-text="$t('sitename')"></span>
            </router-link>
          </div>

          <div class="nav-container bg-light pt-3 mb-5">
            <b-navbar-nav class="nav navbar-nav ml-auto text-uppercase">
              <b-nav-item-dropdown class="w-100" right>
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
                <span v-text="$t('navigation.' + page.name)"></span>
                <span class="sr-only" v-text="$t('navigation.' + page.name)"></span>
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
        <b-navbar-nav class="nav navbar-nav text-uppercase ml-auto" role="menu">
          <router-link v-for="page in getPages.sort((a,b) => {
                    return a.innav.order > b.innav.order ? 1 : -1
                  }).filter( p => { return p.innav.show})" :key="'innav' + page.name"
              :to="{path: page.path}"
              active-class="active"
              tag="b-nav-item"
              role="menuitem"
              exact>
            <span v-text="$t('navigation.' + page.name)"></span>
            <span class="sr-only" v-text="$t('navigation.' + page.name)"></span>
          </router-link>

          <b-dropdown right>
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
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import globalmixin from "@/utils/globalmixin";
export default {
  name: "Header",
  mixins:[globalmixin],
  data() {
    return {
      routes: this.$router.options.routes,
      cookieName: 'cookieconsent_status',
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
      if(this.$route.path !== '/') {
        this.$router.push({path: "/"})
      }
      this.$refs.toplogo.blur();
      scrollTo(0,0);
    }
  },
  computed: {
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
  }
}
</script>
