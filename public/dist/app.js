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

angular
  .module('gitboard', [
    'ui.router',
    'github',
    'gitboard.controllers.user'
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
            user:           ['$stateParams', 'userService', function($stateParams, User) {
              return User.get({ user: $stateParams.user });
            }]
          },
          views:            {
            '':             {
              controller:   'userController',
              templateUrl:  'gitboard/partials/user.html'
            },
            'profile':      {
              controller:   'userController',
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
  .module('github', [
    'github.services.user',
    'github.services.repo'
  ])
;

angular
  .module('github.services.repo', [
    'ngResource'
  ])
  .factory('repoService', [
    '$resource',

    function($resource) {
      var repo = $resource('https://api.github.com/users/:user/repos');

      return repo;
    }
  ])
;

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
