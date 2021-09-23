<template>
  <section :id="id" :class="getPageData('classes')">
    <div class="container">

      <div class="row" :key="id + s.name + rowcount"
           v-for="(s, rowcount) in getPageData('rows').filter(col => { return col.name != 'timeline-items'})"
           :class="s.classes">
        <div :class="c.size + ' ' + c.classes"
             :key="id + s.name + i"
             v-for="(c, i) in s.cols"
             :style="c.image ? 'min-height:350px; background:url(' + c.image + ') no-repeat center / contain; rounded shadow' : ''">
          <div class="mt-5" v-html="getLanguageItem(c.content)"></div>
        </div>
    </div>

      <div class="row" :key="id + s.name + rowcount"
           v-for="(s, rowcount) in getPageData('rows').filter(col => { return col.name == 'timeline-items'})"
           :class="s.classes">
          <ul class="list-group timeline">
              <li :class="c.classes"
                  :key="id + s.name + i"
                  v-for="(c, i) in s.cols"
                  class="list-group-item">
                <div class="timeline-image">
                  <img v-if="c.image && c.image != ''" class="rounded-circle img-fluid" :src="c.image">
                  <div v-if="i == s.cols.length - 1" v-html="getLanguageItem(c.content)">
                  </div>
                </div>
                <div class="timeline-panel"
                     v-if="i < s.cols.length - 1"
                     v-html="getLanguageItem(c.content)"></div>
              </li>
            </ul>
      </div>
    </div>

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

  </section>
</template>

<script>
import pagemixin from "@/utils/pagemixin";

export default {
  props: ['page'],
  name: 'About',
  mixins: [pagemixin],
}
</script>