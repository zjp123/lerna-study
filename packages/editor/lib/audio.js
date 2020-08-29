import { Quill } from 'vue-quill-editor';
const BlockEmbed = Quill.import('blots/block/embed');
class AudioBlot extends BlockEmbed {
  // static create (value) {
  //   let node = super.create();
  //   node.setAttribute('class', 'audio');
  //   node.setAttribute('src', value);
  //   node.setAttribute('controls', true);
  //   node.setAttribute('preload', 'none');
  //   node.setAttribute('width', '');
  //   node.setAttribute('height', '');
  //   return node;
  // }
  static create (value) {
    const videoUrl = typeof value === 'object' && value.hasOwnProperty('url') ? value.url : value;
    let node = super.create();
    node.setAttribute('class', 'audio');
    node.setAttribute('src', videoUrl);
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

export default AudioBlot;

