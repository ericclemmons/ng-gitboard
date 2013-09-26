angular
  .module('gitboard', [
    'ui.router',
    'github'
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
