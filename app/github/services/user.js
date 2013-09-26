angular
  .module('github')
  .factory('userService', [
    '$resource',

    function($resource) {
      var User = $resource('https://api.github.com/users/:user');

      return User;
    }
  ])
;
