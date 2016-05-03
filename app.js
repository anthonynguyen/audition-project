var app = angular.module('auditionProject', []);

app.controller('MainCtrl', [
  '$scope',
  function($scope) {
    $scope.test = 'Hello world!';

    $scope.messages = [
      {name: 'message 1', message: 'hello'},
      {name: 'message 2', message: 'bluwh'}
    ];

    $scope.getAll = function() {

    };
  }


]);
