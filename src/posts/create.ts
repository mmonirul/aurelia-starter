// https://github.com/ckeditor/ckeditor5/issues/139 (for ck editor)
import { bindable, customElement, bindingMode, autoinject, inject } from 'aurelia-framework';
import Enumerable from 'linq';

@autoinject
export class Create {
  // @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
  // @bindable name;
  value = "alksdfja lskfajslöf k";
  constructor() {


  }
  getValue() {
    console.log(this.value);
    var ar = [1, 3, 34, 13];
    var linqQ = Enumerable.from(ar).where(x => x > 10).toArray();
    console.log(linqQ);
  }

}
