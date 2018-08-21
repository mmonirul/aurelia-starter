import { Router } from 'aurelia-router';
import { autoinject } from "aurelia-framework";
import { AuthService } from "common/services/auth-service";
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class Login {
  loginCredentials: ICredentials = { username: "matengo", password: "matengo" };

  constructor(private authService: AuthService, private router: Router, private eventAggregator: EventAggregator) { }

  login(): void {
    // console.log(JSON.stringify(this.loginCredentials));
    this.authService.getToken(this.loginCredentials).then((token) => {
      localStorage.setItem("token", token);
      this.eventAggregator.publish('user-authenticated', token);
      this.router.navigate('home');
    }).catch((err) => {
      console.error(err);
    });
  }

}
