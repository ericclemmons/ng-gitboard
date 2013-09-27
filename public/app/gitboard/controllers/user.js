angular
  .module('gitboard.controllers.user', [])
  .controller('userController', [
    '$scope',
    'user',
    'repoService',

    function($scope, user, Repo) {
      $scope.user = user;

      user.$promise.then(function(user) {
        $scope.repos = Repo.query({ user: user.login });
      });
    }
  ])
;
