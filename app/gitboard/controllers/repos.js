angular
  .module('gitboard')
  .controller('reposController', [
    '$scope',
    'repos',

    function($scope, repos) {
      $scope.repos = repos;
    }
  ])
;
