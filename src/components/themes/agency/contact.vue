<template>
  <section :id="id" :class="getPageData('classes')">
    <div class="bg-image rellaxv" data-rellax-speed="5"></div>
    <div class="container">


      <div class="row" :key="id + s.name + rowcount"
           v-for="(s, rowcount) in getPageData('rows')"
           :class="s.classes">
        <div :class="c.size + ' ' + c.classes"
             :key="id + s.name + i"
             v-for="(c, i) in s.cols" v-html="getLanguageItem(c.content)">
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <form v-if="getFormState('contactForm')" id="contactForm" name="contactForm"
                @submit.prevent="sendEmail($event)">
            <div class="form-row">
              <div class="col-md-6">
                <div class="form-group">
                  <input class="form-control" type="text" id="name" name="name" placeholder="Your Name *"
                        required></div>
                <div class="form-group">
                  <input class="form-control" type="email" id="email" name="email" placeholder="Your Email *"
                                               required>
                </div>
                <div class="form-group">
                  <input class="form-control" type="tel" name="phone" placeholder="Your Phone *" required></div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <textarea class="form-control" id="message" name="message" placeholder="Your Message *"
                                                  required></textarea>
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="col-lg-12 text-center">
                <div id="success"></div>
                <button class="btn btn-primary btn-xl text-uppercase" id="sendMessageButton" type="submit">Send
                  Message
                </button>
              </div>
            </div>
          </form>
          <div v-else class="bg-white rounded p-3 text-center">
            <h1>Thanks</h1>
            <p>We have received your message</p>
          </div>
        </div>
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
  props:['page'],
  name: 'Contact',
  mixins: [pagemixin],
}
</script>
