
import { HttpClient } from 'aurelia-fetch-client';
import $ from 'jquery';
import { autoinject } from 'aurelia-framework';
import '../model/auth-model';

@autoinject
export class AuthService {
  delay = 100;
  currentUser = null;
  users = ['Nick Shallee', 'Jane Doe'];
  constructor(private httpClient: HttpClient) {

  }

  getToken(credentials: ICredentials) {
    // return this.httpClient.fetch('token', {
    //   method: "POST",
    //   body: JSON.stringify(credentials),
    // }).then(response => response.json())
    // Anotherway
    // httpClient.fetch('comments', {
    //   method: 'post',
    //   body: json(comment)
    // });


    return $.post("https://adockaworkshiftmanagerserver.azurewebsites.net/token", $.param(credentials));
  }

  login(name) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.users.includes(name)) {
          this.currentUser = name;
          resolve({ user: name });
        } else {
          resolve({ error: 'Invalid credentials.' });
        }
      }, this.delay);
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.currentUser = null;
        if (this.currentUser) {
          resolve({ error: 'Error logging out.' });
        } else {
          resolve({ success: true });
        }
      }, this.delay);
    });
  }

  signup(name) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!this.users.includes(name)) {
          this.users.push(name);
          this.currentUser = name;
          resolve({ user: name });
        } else {
          resolve({ error: 'This user already exists.' });
        }
      }, this.delay);
    });
  }

}
