/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
// /// <reference path="../node_modules/aurelia-fetch-client/doc/whatwg-fetch.d.ts" />

// we want font-awesome to load as soon as possible to show the fa-spinner
import "bootstrap";
import "font-awesome/css/font-awesome.css";

import { Aurelia } from 'aurelia-framework'
import environment from 'environment';
import { PLATFORM } from 'aurelia-pal';
import Bluebird from 'bluebird';
import { HttpClient } from 'aurelia-fetch-client';

import moment from 'moment';
import 'moment/locale/sv';
import $ from 'jquery';
import "froala-editor/js/froala_editor.pkgd.min";


// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  let container = aurelia.container;

  let http = new HttpClient();
  http.configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl('https://adockaworkshiftmanagerserver.azurewebsites.net/api/')
      .withDefaults({
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      })
      .withInterceptor({
        request(request) {
          console.log(`Requesting ${request.method} ${request.url}`);
          return request;
        },
        response(response) {
          console.log(`Received ${response.status} ${response.url}`);
          return response;
        }
      });
  });

  container.registerInstance(HttpClient, http);

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-froala-editor'), config => {
    config.options({
      toolbarInline: true,
      height: 500,
      heightMin: 400
    })
  });
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName('aurelia-dialog'));
  return aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
