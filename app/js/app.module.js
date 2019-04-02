'use strict';

/**
 * @ngdoc overview
 * @name Es6App
 * @description 
 * Angular application that provides navigation and directives for the ES6 demo.
 */

angular.module('Es6App', ['ngRoute']);

angular.module('Es6App').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/start', {
        templateUrl: 'partials/start.html'
      }).
      when('/pages/:page', {
        //templateUrl: function(params) { return 'partials/page' + params.page + '.html'; }
        template: function(params) {
            
            var pagenum = parseInt(params.page);
            var page = `<h1>ECMAScript 6 - An Introduction</h1>
                        <hr />
                        <div class="content-partial" ng-include src="'partials/page${params.page}.html'"></div>`;
            var pages = 21;
            
            if (params.page > 2) {
                page += `<div class="row nav-controls">
                         <div class="col-lg-4 col-md-4 page previous"><a href="#/pages/${pagenum - 1}">&lsaquo; Previous</a></div>
                         <div class="col-lg-4 col-md-4 page index"><a href="#/pages/2">Index</a></div>`;
                
                if (parseInt(params.page) !== pages) {
                  page += `<div class="col-lg-4 col-md-4 page next"><a href="#/pages/${pagenum + 1}">Next &rsaquo;</a></div>`;
                }
                
                page += `</div>`;
            }
            
            return page; 
        }
      }).
      otherwise({
        redirectTo: '/start'
      });
  }]);