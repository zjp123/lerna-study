# `@lexue/editor`

> TODO: description

# 使用

------

```python
import Editor from '@lexue/editor';
# template 中
Editor(
  :content='question.topicContent'
  ref="myTopicEditor"
  :disabled='disabled'
  @blur="onEditorBlur($event)"
  @focus="onEditorFocus($event)"
  @change="changeHandle($event)"
)

# computed中
computed: {
    editor () {
      return this.$refs.myTopicEditor.$children[0].quill;
    }
}

# 其他方法中即可使用
this.editor.xxxxxx

# 案例详见
crm/src/pages/teacher/taskManagement/components/QuestionBase.vue
```
------

> 官方文档
https://github.com/surmon-china/vue-quill-editor/blob/master/src/editor.vue




