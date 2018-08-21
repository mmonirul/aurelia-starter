import { PostService } from "common/services/post-service"

import { autoinject } from 'aurelia-framework';

@autoinject
export class Index {
  posts: any[] = [];
  params: any;
  constructor(private postService: PostService) {
  }
  activate(params) {
    this.params = params;
    console.log(this.params);
    this.postService.postsByArchive(this.params.archive).then((data: any) => {
      this.posts = data.posts;
    }).catch(error => {
      console.error(error);
    });
  }
}
