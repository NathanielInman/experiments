angular.module('BudgetModule').controller('MainCtrl', function ($scope, $window) {
  'use strict';

  $scope.updateTotal = function(){
    var i= 0,t= 0,list=$scope.todos;
    for(;i<list.length;i++){
      t+=list[i].amount||0; //don't allow undefined amount to be added
    } //end for
    $scope.total = t.toFixed(2); //return as currency type
  };

  $scope.add = function () {
    var todo = {
      label : $scope.label,
      amount: $scope.amount,
      isDone: false
    };
    $scope.todos.push(todo);
    $scope.updateTotal();
    $window.localStorage.setItem('todos', JSON.stringify(angular.copy($scope.todos)));
    $scope.label = '';
    document.getElementById('label').focus();
  };

  $scope.remove = function(){
    var list=$scope.todos,i; //iterator for each todos element
    for(i=list.length-1;i>=0;i--){
      if(list[i].isDone){
        list.splice(i,1);
      } //end if
    } //end for
    document.getElementById('label').focus();
  };

  $scope.check = function () {
    this.todo.isDone = !this.todo.isDone;
  };

  //initialization
  $scope.todos = JSON.parse($window.localStorage.getItem('todos') || '[]');
  $scope.updateTotal();
  $scope.$watch('todos', function (newTodos, oldTodos) {
    if (newTodos !== oldTodos) {
      $window.localStorage.setItem('todos', JSON.stringify(angular.copy($scope.todos)));
    }
  }, true);
});
