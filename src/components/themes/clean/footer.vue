<template>
  <div>
    <b-modal id="cookie-permission"
             v-model="nothanks"
             size="sm"
             hide-footer
             hide-header
             hide-backdrop
             no-close-on-backdrop
             :title="$t('websiteusescookies')">
      <div class="row rounded-top bg-white m-0">
        <div class="col-12">
          <h3 class="text-blue gilroy-eb ms-3 pt-2" v-text="$t('websiteusescookies')"></h3>
          <p v-text="$t('cookietext')" class="ms--1"></p>
        </div>
      </div>
      <div class="row bg-dark rounded-bottom pb-2 pt-2 m-0">
        <div class="col-12 pb-2">
          <div class="btn btn-success p-3 text-uppercase btn-sm w-100 ms-1" @click.prevent="acceptcookies()" v-text="$t('acceptallcookies')"></div>
        </div>
        <div class="col-12">
          <div class="btn btn-secondary p-2 text-uppercase btn-sm w-100 ms-1" @click.prevent="declinecookies()" v-text="$t('acceptnecessarycookies')"></div>
        </div>
      </div>
    </b-modal>
    <footer class="footer d-print-none bg-dark pt-3" >
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-4 pb-3 pr-md-1">
            <p class="mb-3 pb-2 border-line-dark ms-1 text-white font-weight-bold"
               v-text="$t('aboutus')">About us</p>
            <div class="w-md-80">
              <p class="mb-2 text-white pb-2" v-text="$t('aboutusfooter')"></p>
              <router-link
                  v-for="page in getPages.sort((a,b) => {
                    return a.innav.order > b.innav.order ? 1 : -1
                  }).filter( p => { return p.innav.show && p.name == 'contact'})"
                  :key="'contact-link' + page.path"
                  role="button"
                  class="btn btn-primary w-100 text-uppercase p-3 ms-1"
                  :to="{ name: page.name }"
                  v-text="$t('navigation.findusnearyou')">Find us near you
              </router-link>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <p class="mb-3 pb-2 border-line-dark ms-1 text-white font-weight-bold"
               v-text="$t('quicklinks')">Quick links</p>
            <ul class="list-unstyled">
              <li
                  v-for="page in getPages.sort((a,b) => {
                    return a.infooter.order > b.infooter.order ? 1 : -1
                  }).filter( p => { return p.infooter.show})"
                  :key="'footer-nav' + page.path">
                <router-link
                    :to="page.path"
                    active-class="active"
                    exact>
                  <span v-text="$t('navigation.' + page.name)"></span>
                </router-link>
              </li>
            </ul>
          </div>

          <div class="col-12 col-md-4 pl-md-1">
            <p class="mb-3 pb-2 border-line-dark ms-1 text-green font-weight-bold" v-text="$t('facebook')"></p>
            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/vueShop/"
               class="mb-2 rounded d-block" id="fppost" aria-label="Facebook">
              <span class="sr-only">Opens a new window</span>
            </a>
          </div>
        </div>
      </div>

      <div class="container social">
        <div class="row">
          <div class="pt-3" :class="showsocial? 'col-12 col-md-8' : 'col-12'">
            <p class="text-white ms--1 pt-1"
               v-html="$t('copyright', {date})"></p>
          </div>
          <div class="col-12 col-md-4 pl-md-1 pt-4" v-if="showsocial">
            <ul class="list-inline">
              <li class="list-inline-item footer-facebook" v-if="getSocialLinks('facebook') != ''">
                <a target="_blank" rel="noreferrer" :href="getSocialLinks('facebook')">
                  <b-icon icon="facebook"></b-icon><span class="sr-only">Facebook</span></a></li>
              <li class="list-inline-item footer-twitter" v-if="getSocialLinks('twitter') != ''">
                <a target="_blank" rel="noreferrer" :href="getSocialLinks('twitter')">
                <b-icon icon="twitter"></b-icon><span class="sr-only">Twitter</span></a></li>
              <li class="list-inline-item footer-linkedin" v-if="getSocialLinks('linkedin') != ''">
                <a target="_blank" rel="noreferrer"
                   :href="getSocialLinks('linkedin')">
                  <b-icon icon="linkedin"></b-icon><span class="sr-only">Linkedin</span></a></li>
              <li class="list-inline-item footer-instagram" v-if="getSocialLinks('instagram') != ''">
                <a target="_blank" rel="noreferrer" :href="getSocialLinks('instagram')">
                  <b-icon icon="instagram"></b-icon><span class="sr-only">Instagram</span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { bootstrap } from 'vue-gtag'
import globalmixin from "@/utils/globalmixin";
export default {
  name: "Footer",
  mixins:[globalmixin],
  computed: {
    date() {
      return new Date().getFullYear()
    },
    checkedValue:{
      get: function () {
        return this.checked;
      },
      set: function (newValue) {
        this.checked = newValue;
        if(newValue){
          this.enableTracking()
        } else {
          let exdate = new Date()
          exdate.setDate(exdate.getDate() -1)
          const cookie = [
            `${this.cookieName}=1`,
            `expires=${exdate.toUTCString()}`,
            `path=/`,
            this.getcookieflag()
          ]
          document.cookie = cookie.join(';')
        }
        this.checked = newValue
      }
    }
  },
  data() {
    return {
      pathname: '',
      cookieName: 'a-ga',
      declinecookiename: 'cookieconsent_status',
      checked:false,
      nothanks:false,
      showsocial:true,
      trakerloaded:false,
      trackingcheck:false,
    }
  },
  methods: {
    acceptcookies(){
      this.nothanks = false;
      this.checkedValue=true;
    },
    declinecookies(){
      this.nothanks = false;
      this.checkedValue=false;
      this.setDeclinedCookie();
    },
    getcookieflag(){
      let secure = `sameSite=Lax`;
      if(process.env.NODE_ENV !== 'development'){
        secure = `sameSite=none;secure`
      }
      return secure;
    },
    getDeclinedCookie(){
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${this.declinecookiename}=`)
      return parts.length !== 2 ?
          undefined :
          parts.pop().split(';').shift()
    },
    getCookie() {
      if(window.location.href.indexOf('localhost') !== -1){
        return true;
      }
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${this.cookieName}=`);
      return parts.length !== 2 ?
          undefined :
          parts.pop().split(';').shift()
    },
    enableTracking () {
      this.setCookie();
      this.setDeclinedCookie(); // Set both so we know the question has been asked for other pages

      // Below is to stop pre-render showing cookies message
      if(window.location.toString().indexOf('localhost') === -1) {
        if (!this.trakerloaded) {
          this.trakerloaded = true;
          bootstrap().then(() => {
            this.trackingcheck = true;
          });
          this.$gtag.pageview({
            page_path: this.$route.fullPath,
          })
          this.$gtag.set({cookie_flags: this.getcookieflag()});
        }
      }
    },
    setDeclinedCookie(){
      const exdate = new Date()
      exdate.setDate(exdate.getDate() + (365))
      const cookie = [
        `${this.declinecookiename}=1`,
        `expires=${exdate.toUTCString()}`,
        `path=/`,
        this.getcookieflag()
      ]
      document.cookie = cookie.join(';')
    },
    setCookie(){
      const exdate = new Date()
      exdate.setDate(exdate.getDate() + (365))
      const cookie = [
        `${this.cookieName}=1`,
        `expires=${exdate.toUTCString()}`,
        `path=/`,
        this.getcookieflag()
      ]
      document.cookie = cookie.join(';')
    }
  },
  created() {
    this.$nextTick( () => {
      if (this.getCookie()) {
        this.checkedValue = true;
        this.enableTracking();
      } else if(!this.getDeclinedCookie()){
        if(window.location.href.indexOf('localhost') === -1) {
          if(window.location.href.indexOf('Embed') === -1) {
            this.nothanks = true; // Show Cookie Consent
          }
        }
      }
    });
    this.pathname = this.$route.name;
  }
}
</script>
