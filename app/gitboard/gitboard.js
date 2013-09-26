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
        .state('home', {
          url:              '/:username',
          resolve:          {
            user:           ['$stateParams', 'userService', function($stateParams, User) {
              return User.get({ username: $stateParams.username });
            }]
          },
          views:            {
            '':             {
              controller:   'homeController',
              templateUrl:  'gitboard/partials/home.html'
            },
            'profile':      {
              controller:   'homeController',
              templateUrl:  'gitboard/partials/profile.html'
            }
          }
        })
      ;


      //       },
      //     }
      //   })
      // ;

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
