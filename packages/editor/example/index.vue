<template>
  <div id="zjp">
    <editor
      :content='content'
      ref="myTopicEditor"
      :disabled='disabled'
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="changeHandle($event)"
    />
  </div>
</template>

<script>
import Vue from 'vue'
// import Editor from '../dist/main.b28ad0.js'
import Editor from '../lib/editor.vue'
// import Editor from '../lib/main-product.js'
// Vue.use(Editor)
export default {
  components: {
    Editor
  },
  computed: {
    editor () {
      return this.$refs.myTopicEditor.$children[0].quill;
    }
  },
  data() {
    return {
      content: '',
      disabled: false
    }
  },
  methods: {
    onEditorBlur () {},
    onEditorFocus () {},
    changeHandle () {},
  },
}
</script>

<style lang="scss" scoped>

</style>