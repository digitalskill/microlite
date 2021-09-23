<template>
  <section :id="id" :class="getPageData('classes')">

    <b-modal id="modal-portfolio" size="xl" hide-footer>
      <b-carousel
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          v-if="modalcontent.sliders"
          style="text-shadow: 1px 1px 2px #333;">
        <b-carousel-slide :img-src="slide.image != '' ? slide.image : 'img-blank'"
                          :key="'slide' + i"
                          v-for="(slide,i) in modalcontent.sliders">
          <div v-html="slide.html"></div>
        </b-carousel-slide>
      </b-carousel>
    </b-modal>

    <div class="container">
      <div class="row" :key="id + s.name + rowcount"
           v-for="(s, rowcount) in getPageData('rows')"
           :class="s.classes">
        <div :class="c.size + ' ' + c.classes"
             :key="id + s.name + i"
             v-for="(c, i) in s.cols">
          <div v-if="s.name=='portfolio-items'" class="rounded shadow h-100 bg-white">
            <div class="portfolio-link" v-b-modal.modal-portfolio @click="modalcontent = c">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content d-flex align-content-center">
                  <b-icon icon="plus" class="m-auto text-primary font-weight-bold"></b-icon>
                </div>
              </div>
              <div class="image-container">
              <img v-if="c.image && c.image != ''" class="img-fluid" :src="c.image" :alt="c.image.split('/').pop()">
              </div>
            </div>
            <div class="portfolio-caption" v-html="getLanguageItem(c.content)">
            </div>
          </div>
          <div v-else v-html="getLanguageItem(c.content)"></div>
        </div>
      </div>
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
  name: 'Portfolio',
  data(){
    return {
      modalcontent:{},
    }
  },
  mixins: [pagemixin],
}
</script>
