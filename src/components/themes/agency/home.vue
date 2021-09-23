<template>
  <div :id="id" class="animate__animated animate__fadeIn">
    <header class="masthead">
      <div class="rellaxv bg-image" data-rellax-speed="-5"
           :key="'bg' + row.name"
           v-for="row in getPageData('rows').filter(r => { return r.name == 'top-image'})"
          :style="'background:url(' + row.cols[0].image + ') no-repeat left top / cover'"></div>
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
      </div>
    </header>

    <component v-for="(page, i) in sections" :key="'page' + i" :page="page.name" v-bind:is="page.component"></component>

    <div class="container" v-if="canedit">
      <div class="row">
        <div class="col-6">
          <editpage :pageid="id"></editpage>
        </div>
        <div class="col-6">
          <pagesettings :pageid="id"></pagesettings>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagemixin from "@/utils/pagemixin";
import {pages} from "@/CMS/setup";

export default {
  name: 'Home',
  mixins: [pagemixin],
  computed: {
    sections() {
      return pages.filter(p => {
        let onpage = false;
        p.onpage.forEach(op => {
          if (op.page === this.id) {
            onpage = true;
            p.order = op.order;
          }
        })
        return onpage
      }).sort((a, b) => {
        return a.order > b.order ? 1 : -1
      })
    }
  }
}
</script>
