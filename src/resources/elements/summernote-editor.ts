import { autoinject } from 'aurelia-framework';
//https://github.com/ckeditor/ckeditor5/issues/139#issuecomment-276876222
// https://github.com/summernote/awesome-summernote
//https://github.com/summernote/summernote/issues/1171 (solved)
import { bindable, bindingMode, inlineView, customElement, Container } from 'aurelia-framework';
import 'summernote';
declare var $: any;

@autoinject
@customElement('summernote-editor')
export class SummernoteEditor {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  @bindable options; // per instance options
  // summernoteEditor: Element;
  editor;
  constructor(private summernoteEditor) {
    this.value = "Summner note fire"
  }

  attached() {
    this.initSummernote();
  }
  initSummernote() {
    this.editor = $('#myeditor').summernote(this.defaultConfig);
    if (this.value) {
      $('#myeditor').summernote('code', this.value);
    }
    this.editor.on('summernote.change', this.onTextChanged);
  }

  onTextChanged = () => {
    this.value = $('#myeditor').summernote('code');
  }

  detached() {
    this.destroy();
  }

  destroy() {
    this.editor.off('summernote.change', this.onTextChanged);
    $(this.editor).summernote('destroy');
    this.editor = null;
  }

  defaultConfig = {
    placeholder: "Type your text here...",
    airMode: false,
    minHeight: 120,             // set minimum height of editor
    maxHeight: 400,             // set maximum height of editor
    toolbar: [
      // [groupName, [list of button]]
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['link', ['linkDialogShow', 'unlink']]
    ],
    popover: {
      air: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['color', ['color']],
        ['insert', ['link', 'unlink', 'picture']]
      ]
    }
  };
}
