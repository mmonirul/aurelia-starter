import { autoinject } from "aurelia-framework";
import { PostService } from "common/services/post-service";

@autoinject
export class View {
  post;
  params: any;
  error;
  constructor(private postService: PostService) {

  }
  activate(params) {
    this.postService.find(params.slug).then((data: any) => {
      this.post = data.post;
    }).catch(error => {
      console.error(error.message);
      this.error = error.message;
    });
  }
}
