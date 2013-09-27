angular
  .module('gitboard.controllers.repos', [])
  .controller('reposController', [
    '$scope',
    'repos',

    function($scope, repos) {
      $scope.repos = repos;
    }
  ])
;
