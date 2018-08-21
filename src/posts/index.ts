import { PostService } from "common/services/post-service"
import { AuthService } from "common/services/auth-service"
import { Router } from "aurelia-router";

import { inject, autoinject, Factory } from 'aurelia-framework';

@autoinject
export class Index {
  posts;

  constructor(private authService: AuthService, private postService: PostService, public router: Router) {

  }
  activate() {
    this.postService.allPostPreviews().then((data: any) => {
      this.posts = data.posts;
    }).catch(error => {
      console.error(error);
    });
  }

}
