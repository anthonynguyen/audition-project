var app = angular.module('auditionProject', []);

app.controller('MainCtrl', [
  '$scope',
  function($scope) {
    $scope.test = 'Hello world!';

    $scope.messages = [
      'message 1',
      'message 2'
    ];

    $scope.getAll = function() {

    };
  }


]);
