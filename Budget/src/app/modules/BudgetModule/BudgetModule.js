angular.module('BudgetModule', ['ngRoute'])
  .config(function ($routeProvider) {
    'use strict';

    $routeProvider
      .when('/main', {
        controller: 'MainCtrl',
        templateUrl: 'modules/BudgetModule/views/main.html'
      });
  });

