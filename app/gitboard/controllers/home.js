angular
  .module('gitboard')
  .controller('homeController', [
    '$scope',
    'user',

    function($scope, user) {
      $scope.user = user;
    }
  ])
;
