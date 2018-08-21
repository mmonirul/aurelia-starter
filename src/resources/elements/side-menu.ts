import { PostService } from './../../common/services/post-service';
import { bindable, customElement, bindingMode, autoinject } from 'aurelia-framework';

@autoinject
export class SideMenuCustomElement {
  // @bindable tags;
  //@bindable archives;
  tags: any[] = [];
  archives: any[] = [];
  constructor(private postService: PostService) {

  }
  activate(params, routeConfig, navigationInstruction) {
    console.log('activate');
  }
  attached() {
    this.postService.allTags().then((data: any) => {
      this.tags = data.tags;
    });
    this.postService.allArchives().then((data: any) => {
      this.archives = data.archives;
    });
  }
}
