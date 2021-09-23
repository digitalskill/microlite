<template>
  <div id="app" :class="theme">

    <div v-if="canedit" class="position-fixed animate__animated animate__fadeIn m-2"
         style="z-index: 9999;">
      <div class="btn-group btn-group-sm">
      <button class="btn btn-info preview outline-none border-none shadow-none" @click.prevent="preview = !preview">
        <b-icon icon="phone"></b-icon>
      </button>
        <button class="btn btn-warning outline-none border-none shadow-none"
                  v-if="!sidebar"
                  @click.prevent="addPage()">
          Add Page
        </button>
    <b-button class="microlite-editor outline-none border-none shadow-none"
              v-if="!sidebar"
              v-b-toggle.sidebar-editor>
      <b-icon icon="arrow-right"></b-icon>
    </b-button>
      </div>
    <b-sidebar id="sidebar-editor" title="Site Settings" shadow v-model="sidebar" width="500px">
      <form class="p-3">
        <div class="p-1" :key="'setup' + i" v-for="(item, name, i) in getsetup">
          <label class="text-capitalize">{{name.replace("_", " ")}}</label>
          <input class="form-control" v-model="getsetup[name]">
        </div>
        <div class="p-1">
        <button class="btn btn-primary w-100" @click="saveConfig()">Save</button>
        </div>
      </form>
    </b-sidebar>

    </div>
    <component v-bind:is="header_themetype"></component>
    <transition enter-active-class="animate__animated animate__fadeIn animate__faster"
                leave-active-class="animate__animated animate__fadeOut animate__faster"
                mode="out-in">
    <router-view :key="$route.name"></router-view>
    </transition>
    <component class="animate__animated animate__fadeIn" v-bind:is="footer_themetype"></component>

    <div v-if="reloadready"
         class="rounded shadow p-3 bg-light reloadready">
      <h6>A new update is ready</h6>
      <button class="btn btn-primary w-100" @click="updatePage()">Update Page</button>
    </div>

  </div>
</template>
<script>

import clean_header from "@/components/themes/clean/header";
import clean_footer from "@/components/themes/clean/footer";
import agency_header from "@/components/themes/agency/header";
import agency_footer from "@/components/themes/agency/footer";

import {pages, setup} from "@/CMS/setup";

import update from "@/plugins/update";


export default {
  name: 'App',
  mixins:[update],
  data(){
    return {
      hidebg: true,
      sidebar: false,
      canedit: process.env.NODE_ENV == "development" ? true : false,
      getsetup: setup,
      preview: false
    }
  },
  methods:{
    addPage(){
      if (process.env.NODE_ENV === 'development') {
        let data_json = {};
        data_json.area = "sitepages";
        data_json.data = [...pages]; // Clone

        data_json.data.push({
          "name": "newpage",
          "component": "page",
          "usecomponent": "page",
          "path": "/newpage" + (data_json.data.length + 1),
          "innav": {"show": true, "order": data_json.data.length + 1},
          "infooter": {"show": false, "order": data_json.data.length + 1},
          "sidenav": {"show": true, "order": data_json.data.length + 1},
          "onpage": [{
            "page": "",
            "order": data_json.data.length + 1
          }],
          "seo_change_frequency": "monthly",
          "props": false,
          "datapage": "newpage",
          "hash": "",
          "pagepath": "/newpage" + (data_json.data.length + 1)
        });
        data_json.data.forEach(p => {
          p.component = p.usecomponent;
          p.path = ("/" + p.path).replace("//","/");

          p.onpage.forEach(op => {
            if(op.page == ""){
              p.hash = "";
            }
          });

          if(p.hash == ""){
            p.pagepath = p.path;
          }
        });

        data_json.page = '';
        data_json.theme = setup.theme;

        let address = this.canedit ? location.protocol + "//" + location.hostname + ":9002" : "/app/";

        this.$http.post(address,
            {data: JSON.stringify(data_json)},
            {emulateJSON: true}).then(resp => {
          return resp.json()
        }).then(json => {
          if (json.success) {
            let port = location.port == 80 || location.port == 443 ? '' : ":" + location.port;
            window.location = location.protocol + "//" + location.hostname + port + "/" + this.id
          } else {
            this.pageserror = true;
          }
        }, () => {
        });

      }

    },
    saveConfig(){
      if(process.env.NODE_ENV === 'development') {
        let address = this.canedit ? window.location.protocol + "//" + window.location.hostname + ":9002" : "/app/";
        var data = this.getsetup;
        data.area = 'config';
        data.page = '';
        this.$http.post(address,
            {data: JSON.stringify(data)},
            {emulateJSON:true}).then(resp => {
          return resp.json()
        }).then( json => {
          console.log(json)
        }, () => {})
      }
    }
  },
  computed:{
    theme(){
      return setup.theme + (this.preview ? ' preview' : '')
    },
    footer_themetype(){
      if(setup.theme === 'agency'){
        return agency_footer;
      }
      return clean_footer;
    },
    header_themetype(){
      if(setup.theme === 'agency'){
        return agency_header;
      }
      return clean_header;
    }
  },
  watch: {
    $route() {
      if(this.updateExists){
        this.refreshApp();
      }
    }
  },
  created(){
    this.$nextTick( () => {
      if(!!window.MSInputMethodContext && !!document.documentMode){
        // IS IE - not Edge - No Paralax
      } else {
        if(document.querySelector(".rellaxt")) {
          this.$rellax('.rellaxt');
        }
      }

      // Stop Background flashing twice in pre-render
      if(window.location.href.indexOf('localhost') === -1) {
        this.hidebg = false;
      }
    });
  }
}
</script>
