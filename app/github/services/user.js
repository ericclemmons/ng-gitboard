angular
  .module('github')
  .factory('userService', [
    '$resource',

    function($resource) {
      return $resource('https://api.github.com/users/:username', {}, {
        query: {
          method: 'JSONP',
          params: { callback: 'JSON_CALLBACK' }
        }
      });
    }
  ])
;
