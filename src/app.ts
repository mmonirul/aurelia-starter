import { RouterConfiguration, Router } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";
import { autoinject } from "../node_modules/aurelia-framework";
import { PostService } from "common/services/post-service";
import { HttpClient } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class App {
  user: any;
  constructor(private postService: PostService, private router: Router, private httpClient: HttpClient, private eventAggregator: EventAggregator) {
  }
  activate() {
    this.getUserDetails();
  }
  attached() {
    this.eventAggregator.subscribe('user-authenticated', (token) => {
      // console.log(token);
      this.getUserDetails();
    })
  }

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = "My blog";
    config.map([
      { route: ["", "home"], name: "home", moduleId: PLATFORM.moduleName("./posts/index"), nav: true, title: "All posts" },
      { route: ["login"], name: "login", moduleId: PLATFORM.moduleName("./auth/login"), nav: false, title: "Login" },
      { route: ["signup"], name: "signup", moduleId: PLATFORM.moduleName("./auth/signup"), nav: false, title: "Signup" },
      { route: ["create"], name: "create", moduleId: PLATFORM.moduleName("./posts/create"), href: "create", nav: false, title: "Create post" },
      { route: ["dialog"], name: "dialog", moduleId: PLATFORM.moduleName("./dialogs/welcome"), href: "dialog", nav: false, title: "Open dialog" },
      { route: ["post/:slug"], name: "post-view", moduleId: PLATFORM.moduleName("./posts/view"), href: "post-view", nav: false, title: "View post" },
      { route: "posts/:tag", name: "bytag", moduleId: PLATFORM.moduleName("./posts/tag-view"), href: "tag-view", nav: false, title: "View posts by tag" },
      { route: "archive/:archive", name: "archive", moduleId: PLATFORM.moduleName("./posts/archive-view"), href: "archive-view", nav: false, title: "Archive posts" }

    ]);
  }

  getUserDetails(): void {
    this.httpClient.fetch('home')
      .then(response => response.json())
      .then(data => {
        this.user = data;
      }).catch((error) => {
        console.error(error);
      })
  }
  logout() {
    localStorage.removeItem('token');
    this.user = null;
  }
}
