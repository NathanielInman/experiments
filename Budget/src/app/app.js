
angular.module('budget', [
  'ngRoute',
  'BudgetModule'
])
.config(function ($routeProvider) {
  'use strict';
  $routeProvider
    .otherwise({
      redirectTo: '/main'
    });
});
