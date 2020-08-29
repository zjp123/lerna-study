/* 布置作业
 */

<template lang="pug">
  .createQuestion
    quill-editor.diy-editor(
      :content="content"
      :options="optionsData"
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
import AudioBlot from './audio.js'; // 插入h5 video视频
Quill.register(AudioBlot);
Quill.register(Video);// 注册video
Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css';
// Vue.use(Upload)
// console.log(Quill, 'Quill.BlockEmbedQuill.BlockEmbed');
export default {
  name: 'my-editor',
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
    // options: {
    //   type: Object,
    //   required: false
    // }
    options: {
      type: Object,
      default: function () {
        return {
          placeholder: '请输入...',
          modules: {
            clipboard: {
            // 粘贴版，处理粘贴时候的自带样式
              matchers: [[Node.ELEMENT_NODE, this.HandleCustomMatcher]],
            },
            toolbar: {
              container: [
                ['bold'],
                // ['blockquote', 'code-block'],
                // [{ 'align': [] }],
                // [{ 'color': [] }, { 'background': [] }],
                // ['image', 'video'],
                ['image'],
                ['video'],
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
      editor: null,
      optionsData: {}
      // optionsData: {
      //     placeholder: '请输入...',
      //     modules: {
      //       clipboard: {
      //       // 粘贴版，处理粘贴时候的自带样式
      //         matchers: [[Node.ELEMENT_NODE, this.HandleCustomMatcher]],
      //       },
      //       toolbar: {
      //         container: [
      //           ['bold'],
      //           // ['blockquote', 'code-block'],
      //           // [{ 'align': [] }],
      //           // [{ 'color': [] }, { 'background': [] }],
      //           // ['image', 'video'],
      //           ['image'],
      //           ['video'],
      //           ['voice'] // 音频
      //         ],
      //         handlers: {
      //           'voice': function (value) {
      //           // 添加工具方法，即点击时模仿点击上传组件的按钮
      //             // document.querySelector('.uploadId input').click();
      //             // document.querySelector('.uploadVoiceBtn').click();
      //           }
      //         }
      //       },
      //       // imageDrop: true,
      //       imageResize: {} // 配置图片可缩放大小
      //     }
      //   }
    }
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
    options: {
      immediate: true,
      handler (data) {
        console.log(data, 'optionsoptionsoptions');
        data.modules.clipboard.matchers = [[Node.ELEMENT_NODE, this.HandleCustomMatcher]];
        this.optionsData = data;
      }
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
    // this.editor.clipboard.addMatcher(Node.ELEMENT_NODE, function(node, delta) {
    //     console.log(node, 2222);
    //     if (node.nodeName === 'IMG') {
    //       try {
    //         // node.defaultPrevented();
    //         // this.editor.setSelection(null);
    //         return ;
            
    //       } catch (error) {
    //         console.log(7777)
            
    //       }
    //       // debugger;
    //     }
    //     // console.log(3333);
    //     return delta.insert(node.innerText);
    //     // return;
    // });
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
    HandleCustomMatcher(node, Delta) {
      console.log('zoule ma ');
      // 文字、图片等，从别处复制而来，清除自带样式，转为纯文本
      let ops = []
      // Delta.ops.forEach(op => {
      //   console.log(op, 'opoppop');
      //   if (op.insert && typeof op.insert === 'string') {
      //   ops.push({
      //     insert: op.insert,
      //   })
      //   }
      // })
      Delta.ops.forEach(op => {
        if (op.insert) {
          if (typeof op.insert === 'object' && op.insert.hasOwnProperty('image') && op.insert.image.indexOf('data:image/png;base64') !== -1) {
            return false;
          } else {
            ops.push({
              insert: op.insert
            });
          }
          // if (typeof op.insert === 'object' && (op.insert.hasOwnProperty('voice') || op.insert.hasOwnProperty('video'))) {
          //   ops.push({
          //     insert: op.insert
          //   });
          // }
        }
      });
      Delta.ops = ops
      return Delta
    },
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
    /deep/ strong{
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
    /deep/ .ql-toolbar.ql-snow .ql-formats{
      margin:0px;
    }
    /deep/ .quill-editor {
      line-height: normal;
    }
    /deep/ .voice-bg{
      width:14px;
      height:14px;
      background: url('./voice.png') no-repeat center !important;
      background-size:100% 100%;
    }
    strong{
      font-weight:600;
    }
  }
  .createQuestion /deep/ .voice-bg{
    width:14px;
    height:14px;
    background: url('./voice.png') no-repeat center !important;
    background-size:100% 100%;
  }
</style>
<style>
  /* .diy-editor{
    background: red;
    
  } */
  .ql-editor{
    max-height: 300px;
    overflow-y: scroll;
  }
  body .createQuestion .ql-snow.ql-toolbar .voice-bg{
    width:14px ;
    height:14px ;
    background: url('./voice.png') no-repeat center ;
    background-size:100% 100% ;
  }
  body .ql-toolbar.ql-snow .ql-formats{
    margin:0px;
  }
</style>