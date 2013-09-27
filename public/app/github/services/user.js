angular
  .module('github.services.user', [
    'ngResource'
  ])
  .factory('userService', [
    '$resource',

    function($resource) {
      var User = $resource('https://api.github.com/users/:user');

      return User;
    }
  ])
;
