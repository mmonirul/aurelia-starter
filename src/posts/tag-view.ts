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
    this.postService.postsByTag(this.params.tag).then((data: any) => {
      this.posts = data.posts;
      console.log(this.posts);
    }).catch(error => {
      console.error(error);
    });
  }
}
