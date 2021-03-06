'use strict';

/**
 * @ngdoc overview
 * @name webdotnetukApp
 * @description
 * # webdotnetukApp
 *
 * Main module of the application.
 */
angular
  .module('webdotnetukApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngLodash',
    'Blog'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/edit', {
        templateUrl: 'views/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  Array.prototype.remove = function(item){
    var index = this.indexOf(item);
    return this.splice(index, 1);
  };
