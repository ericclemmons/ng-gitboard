angular
  .module('github')
  .factory('repoService', [
    '$resource',

    function($resource) {
      var repo = $resource('https://api.github.com/users/:user/repos');

      return repo;
    }
  ])
;
