<template>
  <section :id="id">
    <div class="bg-image rellaxv" data-rellax-speed="2"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="text-uppercase section-heading">Contact Us</h2>
          <h3 class="text-muted section-subheading">Lorem ipsum dolor sit amet consectetur.</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <form id="contactForm" name="contactForm" novalidate="novalidate">
            <div class="form-row">
              <div class="col-md-6">
                <div class="form-group"><input class="form-control" type="text" id="name" placeholder="Your Name *"
                                               required=""><small
                    class="form-text text-danger flex-grow-1 help-block lead"></small></div>
                <div class="form-group"><input class="form-control" type="email" id="email" placeholder="Your Email *"
                                               required=""><small
                    class="form-text text-danger help-block lead"></small></div>
                <div class="form-group"><input class="form-control" type="tel" placeholder="Your Phone *" required=""><small
                    class="form-text text-danger help-block lead"></small></div>
              </div>
              <div class="col-md-6">
                <div class="form-group"><textarea class="form-control" id="message" placeholder="Your Message *"
                                                  required=""></textarea><small
                    class="form-text text-danger help-block lead"></small></div>
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import pagemixin from "@/utils/pagemixin";
export default {
  props:['page'],
  name: 'Page',
  mixins: [pagemixin],
}
</script>
