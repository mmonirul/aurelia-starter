import { autoinject } from "aurelia-framework";
import { PostService } from "common/services/post-service";

@autoinject
export class Signup {

  constructor(private postService: PostService) {

  }
  activate() {
  }
}
