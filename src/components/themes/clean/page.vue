<template>
  <div class="vh-100 bg-light mt-5 p-4">
    <div class="container">
      <div class="row">
        <h1 contenteditable="true" @blur="updateContent">PAGE</h1>
      </div>
    </div>
  </div>
</template>

<script>
import pagemixin from "@/utils/pagemixin";
export default {
  name: 'Page',
  props:['page'],
  mixins: [pagemixin]
}
</script>
