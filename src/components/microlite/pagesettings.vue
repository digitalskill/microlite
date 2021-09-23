<template>
  <div class="microlite-editor pagesettings p-3 text-center" v-if="canedit">
    <button class="btn btn-primary text-uppercase w-50" v-text="$t('editpagesettings')" @click.prevent="editingpage = true"></button>
      <b-modal size="lg" :title="$t('editpagesettings')" v-model="editingpage" hide-footer>
    <form @submit.prevent="updatePageSettings()">
      <div :key="id + 'pagedata' + d + i" class="mt-1 mb-1"
           v-for="(p,d,i) in pagedata">
        <div class="input-group" v-if="typeof p != 'object' && d !== 'props' && d !== 'usecomponent' && d !== 'component' && d != 'pagepath'">
          <label :for="id + d" v-text="$t(d)" class="mr-2 pt-1 w-25"></label>
          <input type="text" class="form-control" :id="id + d" :placeholder="$t(d)"
                 v-model="pagedata[d]">
          <div class="input-group-append">
            <div class="input-group-text">
              <div :id="id + d +'tip'">
                <b-icon icon="question"></b-icon>
              </div>
              <b-tooltip :target="id + d + 'tip'">
                <span v-if="d == 'usecomponent'" v-text="$t('componentpath', {file: pagedata.component.__file})"></span>
                <span v-else v-text="$t(d + 'help')"></span>
              </b-tooltip>
            </div>
          </div>
        </div>
        <div class="input-group" v-if="d == 'usecomponent'">
          <label :for="id + d" v-text="$t(d)" class="mr-2 pt-1 w-25"></label>
          <select :id="id + d" v-model="pagedata[d]" class="form-control">
            <option :key="'po' + pind" v-for="(pages, pind) in getAllComponents"
              :value="pages.__file.split('/').pop().replace(/.vue/g,'')">
            {{pages.__file.split("/").pop().replace(/.vue/g,'')}}</option>
          </select>
          <div class="input-group-append">
            <div class="input-group-text">
              <div :id="id + d +'tip'">
                <b-icon icon="question"></b-icon>
              </div>
              <b-tooltip :target="id + d + 'tip'">
                <span v-if="d == 'usecomponent'" v-text="$t('componentpath', {file: pagedata.component.__file})"></span>
                <span v-else v-text="$t(d + 'help')"></span>
              </b-tooltip>
            </div>
          </div>
        </div>
        <div v-if="d=='props'" class="input-group">
          <label :for="id + d" v-text="$t(d)" class="mr-2 pt-1 w-25"></label>
          <select class="form-control" v-model="pagedata[d]">
            <option value="false" v-text="$t('false')"></option>
            <option value="true" v-text="$t('true')"></option>
          </select>
          <div class="input-group-append">
            <div class="input-group-text">
              <div :id="id + d +'tip'">
                <b-icon icon="question"></b-icon>
              </div>
              <b-tooltip :target="id + d + 'tip'"><span v-text="$t(d + 'help')"></span></b-tooltip>
            </div>
          </div>
        </div>
      </div>
      <b-button class="d-block mt-2 mb-3 w-100" v-b-toggle="id + 'advancedpagesettings'" variant="secondary" v-text="$t('advancedsettings')"></b-button>
      <b-collapse :id="id + 'advancedpagesettings'">
        <div :key="id + 'pagedataobjects' + d + i" class="mt-1 mb-1"
             v-for="(p,d,i) in pagedata">
          <div v-if="d=='onpage'" class="border border-dark p-1">
            <label class="bg-dark text-white p-2 d-block text-uppercase" v-text="$t('onpage')"></label>
            <div v-for="(op,j) in p" :key="id + 'onpage' + j" class="row">
              <div class="col-6">
                <select class="form-control" v-model="op.page" @change.prevent="updatePageSettings()">
                  <option value="">None</option>
                  <option :value="sp.name" :key="id + 'onpage' + i"
                          v-for="(sp,i) in getAllpages">{{sp.name}}</option>
                </select>
              </div>
              <div class="col-6">
                <select class="form-control" v-model="op.order">
                  <option value="0">0</option>
                  <option :value="i" :key="'innavshow' + id + i" v-for="i in 20">{{i}}</option>
                </select>
              </div>
            </div>
          </div>
          <div v-if="d=='innav'" class="border border-dark p-1">
            <label class="bg-dark text-white p-2 d-block text-uppercase" v-text="$t('innavigation')"></label>
            <div class="row">
              <div class="col-6">
                <select class="form-control" v-model="p.show">
                  <option value="true" v-text="$t('show')"></option>
                  <option value="false" v-text="$t('hide')"></option>
                </select>
              </div>
              <div class="col-6">
                <select class="form-control" v-model="p.order">
                  <option value="0">0</option>
                  <option :value="i" :key="'innavshow' + id + i" v-for="i in 20">{{i}}</option>
                </select>
              </div>
            </div>
          </div>
          <div v-if="d=='infooter'" class="border border-dark p-1">
            <label class="bg-dark text-white p-2 d-block text-uppercase" v-text="$t('infooter')"></label>
            <div class="row">
              <div class="col-6">
                <select class="form-control" v-model="p.show">
                  <option value="true" v-text="$t('show')"></option>
                  <option value="false" v-text="$t('hide')"></option>
                </select>
              </div>
              <div class="col-6">
                <select class="form-control" v-model="p.order">
                  <option value="0">0</option>
                  <option :value="i" :key="'infooter' + id + i" v-for="i in 20">{{i}}</option>
                </select>
              </div>
            </div>
          </div>
          <div v-if="d=='sidenav'" class="border border-dark p-1">
            <label class="bg-dark text-white p-2 d-block text-uppercase" v-text="$t('insidenav')"></label>
            <div class="row">
              <div class="col-6">
                <select class="form-control" v-model="p.show">
                  <option value="true" v-text="$t('show')"></option>
                  <option value="false" v-text="$t('hide')"></option>
                </select>
              </div>
              <div class="col-6">
                <select class="form-control" v-model="p.order">
                  <option value="0">0</option>
                  <option :value="i" :key="'insidenav' + id + i" v-for="i in 20">{{i}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </b-collapse>
      <button type="submit" class="btn btn-primary" v-text="$t('updatepage')"></button>
    </form>
  </b-modal>
  </div>
</template>

<script>
import microlitemixin from "@/components/microlite/microlitemixin";

export default {
  name: "pagesettings",
  mixins: [microlitemixin]
}
</script>