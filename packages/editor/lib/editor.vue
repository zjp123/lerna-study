/* 布置作业
 */

<template lang="pug">
  .createQuestion
    quill-editor(
      :content="content"
      :options="options"
      ref='myQuillEditor'
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    )
    slot

</template>
<script>
import { quillEditor, Quill } from 'vue-quill-editor';
import { ImageDrop } from 'quill-image-drop-module';
import ImageResize from 'quill-image-resize-module';
import Video from './editor_video.js'; // 插入h5 video视频
Quill.register(Video);// 注册video
Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);
// console.log(Quill, 'Quill.BlockEmbedQuill.BlockEmbed');
const BlockEmbed = Quill.import('blots/block/embed');
class AudioBlot extends BlockEmbed {
  static create (value) {
    let node = super.create();
    node.setAttribute('class', 'audio');
    node.setAttribute('src', value);
    node.setAttribute('controls', true);
    node.setAttribute('preload', 'none');
    node.setAttribute('width', '');
    node.setAttribute('height', '');
    return node;
  }

  static value (node) {
    return {
      class: node.getAttribute('class'),
      url: node.getAttribute('src'),
      controls: node.getAttribute('controls'),
      preload: node.getAttribute('preload'),
      width: node.getAttribute('width'),
      height: node.getAttribute('height')
    };
  }
}

AudioBlot.blotName = 'voice';
AudioBlot.tagName = 'audio';
Quill.register(AudioBlot);
export default {
  components: {
    quillEditor
  },
  props: {
    content: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => {
        return {
          placeholder: '请输入...',
          modules: {
            toolbar: {
              container: [
                ['bold'],
                // ['blockquote', 'code-block'],
                // [{ 'align': [] }],
                // [{ 'color': [] }, { 'background': [] }],
                ['image', 'video'],
                ['voice'] // 音频
              ],
              handlers: {
                'voice': function (value) {
                // 添加工具方法，即点击时模仿点击上传组件的按钮
                  // document.querySelector('.uploadId input').click();
                  // document.querySelector('.uploadVoiceBtn').click();
                }
              }
            },
            // imageDrop: true,
            imageResize: {} // 配置图片可缩放大小
          }
        };
      },
      required: false
    }
  },
  data () {
    return {
      editor: null
    };
  },
  computed: {
    // editor () {
    //   alert(8888);
    //   return this.$refs.myQuillEditor;
    // }
  },
  watch: {
    content (val) {
      this.content = val;
    },
    options (val) {
      this.options = val;
    },
    disabled: {
      immediate: true,
      handler (data) {
        if (this.$props.disabled) {
          this.$refs.myQuillEditor && this.$refs.myQuillEditor.quill.enable(false);
        } else {
          this.$refs.myQuillEditor && this.$refs.myQuillEditor.quill.enable(true);
        }
      },
      deep: true
    }
  },
  mounted () {
    this.editor = this.$refs.myQuillEditor;
    this.initVoiceButton();
    if (this.$props.disabled) {
      this.editor.quill.enable(false);
    } else {
      // alert(999);
      this.editor.quill.enable(true);
      // debugger;
    }
  },
  created () {
  },
  methods: {
    initVoiceButton: function () {
      // 初始化"voice"按钮样式
      const voiceButtonList = document.querySelectorAll('.ql-voice');
      for (let index = 0; index < voiceButtonList.length; index++) {
        voiceButtonList[index].classList.add('fa');
        voiceButtonList[index].classList.add('voice-bg');
        voiceButtonList[index].classList.add('fa-lg');
      }
    },
    onEditorBlur (index) { // 失去焦点事件
      // console.log(index);
      this.$emit('blur', index);
    },
    onEditorFocus (index) { // 获得焦点事件
      this.$emit('focus', index);
      // this.focus();
    },
    onEditorChange (content) { // 内容改变事件
      // this.$emit('inputChange', content);
      this.$emit('change', content);
    }
  }
};
</script>
<style lang="scss" scoped>
  .createQuestion{
    >>> strong{
      font-weight: 800 !important;
    }
    .el-upload-list__item-delete{
      top: 113px;
      display: block;
    }
    .inputType{
      width: 360px;
    }
    .el-form{
      margin: auto;
    }
    .el-table{
      border: 1px solid #ccc;
      box-sizing: border-box;
    }
    .ql-editor.ql-blank::before{
      font-family: none!important;
      font-style: inherit!important;
    }
    .avatar-uploader .el-upload{
      border: none;
    }
    .avatar-uploader{
      width: 100px!important;
      height: 100px!important;
      .avatar-uploader-icon{
        width: 100px;
        height: 100px;
        line-height: 100px!important;
      }
    }
    .ql-container.ql-snow{
      padding: 10px 0;
      .ql-editor{
        padding: 20px 15px!important;
      }
    }
    >>>.ql-toolbar.ql-snow .ql-formats{
      margin:0px;
    }
    >>>.quill-editor {
    line-height: normal;
    }
    >>>.voice-bg{
      width:14px;
      height:14px;
      background: url('~@/assets/img/voice.png') no-repeat center;
      background-size:100% 100%;
    }
    strong{
      font-weight:600;
    }
  }
</style>
