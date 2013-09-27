angular
  .module('gitboard.controllers.user', [])
  .controller('gitboard.controllers.user', [
    '$scope',
    'user',

    function($scope, user) {
      $scope.user = user;
    }
  ])
;
