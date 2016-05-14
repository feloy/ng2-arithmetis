/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/*.js',
      'es6-shim/es6-shim.js',
      'reflect-metadata/*.js',
      'rxjs/**/*.js',
      '@angular/**/*.js',
      'mathjs/dist/math.min.js',
      'i18next/i18next.min.js',
      'i18next-xhr-backend/i18nextXHRBackend.min.js',
      'i18next-browser-languagedetector/i18nextBrowserLanguageDetector.min.js',
      'ng2-i18next/**/*.js'
    ]
  });
};
