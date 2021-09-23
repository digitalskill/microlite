<template>
  <section :id="id" class="bg-white">
    <div  class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="text-uppercase section-heading" v-text="getLanguageItem('menu')"></h2>
          <h3 class="text-muted section-subheading" v-text="getLanguageItem('about')"></h3>
        </div>
      </div>
      <div class="row text-center">
        <div class="col-md-4 pb-3" :key="'service' + i"
             v-for="(service, i) in getPageData('items')">
            <span class="circle mb-3 text-white d-flex align-content-center align-items-center justify-content-center">
                <b-icon icon="cart3"></b-icon>
            </span>
          <h4 class="section-heading" v-text="getLanguageItem('heading.' + i )"></h4>
          <div class="text-muted" v-html="getLanguageItem('content.' + i)"></div>
        </div>
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
  </section>
</template>

<script>
import pagemixin from "@/utils/pagemixin";

export default {
  props:['page'],
  name: 'services',
  mixins: [pagemixin],
}
</script>
