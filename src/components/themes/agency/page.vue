<template>
  <section :id="id" :class="getPageData('classes')">
    <div class="container">
      <div class="row" :key="id + s.name + rowcount"
           v-for="(s, rowcount) in getPageData('rows')"
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
</template>

<script>
import pagemixin from "@/utils/pagemixin";

export default {
  props: ['page'],
  name: 'Page',
  mixins: [pagemixin],
}
</script>
