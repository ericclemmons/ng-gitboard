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
