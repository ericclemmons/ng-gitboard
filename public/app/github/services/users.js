angular
  .module('github.services.users', [])
  .service('github.services.users', [
    '$http',

    function($http) {
      var baseUrl = 'https://api.github.com';

      var parse = function(response) {
        return response.data;
      };

      this.get = function(login) {
        return $http
          .get(baseUrl + '/users/' + login)
          .then(parse)
          .then(function(user) {
            user.repos = $http
              .get(user.repos_url)
              .then(parse)
              .then(function(repos) {
                angular.forEach(repos, function(repo) {
                  repo.issues = $http
                    .get(repo.issues_url.replace('{/number}', ''))
                    .then(parse)
                  ;
                });

                return repos;
              })
            ;

            return user;
          })
        ;
      };
    }
  ])
;
