<template>
  <div :class="pageloaded">
    <header class="masthead" style="margin-top: -200px;">
      <div class="rellaxv bg-image" data-rellax-speed="-5"
           :key="'bg' + row.name"

           v-for="row in getPageData('rows').filter(r => { return r.name == 'top-image'})"
          :style="'background:url(' + row.cols[0].image + ') no-repeat center top / cover'"></div>
    </header>

    <section :id="id" :class="getPageData('classes')">
      <div class="container">
        <div class="row" :key="id + s.name + rowcount"
             v-for="(s, rowcount) in getPageData('rows').filter(r => { return r.name != 'top-image'})"
             :class="s.classes">
          <div :class="c.size + ' ' + c.classes"
               :key="id + s.name + i"
               v-for="(c, i) in s.cols"
               v-html="getLanguageItem(c.content)">
          </div>
        </div>
        <div class="row" v-if="canedit">
          <div class="col-6">
            <editpage :pageid="id"></editpage>
          </div>
          <div class="col-6">
            <pagesettings :pageid="id"></pagesettings>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import pagemixin from "@/utils/pagemixin";

export default {
  props:['page'],
  name: 'Team',
  mixins: [pagemixin],
  data(){
    return {
      pageloaded: ''
    }
  },
  created(){
    this.$nextTick(() => {
      this.pageloaded = 'ploaded';
    });
  }
}
</script>
