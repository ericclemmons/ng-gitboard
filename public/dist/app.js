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

angular
  .module('gitboard', [
    'chieffancypants.loadingBar',
    'gitboard.controllers.user',
    'github.services.users',
    'ui.router'
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',

    function($stateProvider, $urlRouterProvider) {
      $stateProvider

        .state('get-started', {
          url:              '/get-started',
          templateUrl:      'gitboard/partials/get-started.html'
        })

        .state('get-started.name', {
          url:              '/name',
          templateUrl:      'gitboard/partials/get-started.name.html'
        })

        .state('user', {
          url:              '/:user',
          resolve:          {
            user:           ['$stateParams', 'github.services.users', function($stateParams, Users) {
              return Users.get($stateParams.user);
            }]
          },
          views:            {
            '':             {
              controller:   'gitboard.controllers.user',
              templateUrl:  'gitboard/partials/user.html'
            },
            'profile':      {
              controller:   'gitboard.controllers.user',
              templateUrl:  'gitboard/partials/profile.html'
            }
          }
        })
      ;

      $urlRouterProvider.otherwise('/get-started');
    }
  ])
  .run([
    '$rootScope',
    '$state',
    '$stateParams',

    function($rootScope, $state, $stateParams) {
      $rootScope.$state       = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ])
;

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
