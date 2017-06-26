(function() {
  angular.module('NALP', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
  .config(config)
  .run(run)

  config.$inject = [
    '$provide',
    'authProvider',
    '$urlRouterProvider',
    '$stateProvider',
    '$httpProvider',
    'jwtInterceptorProvider'
  ];

  function config($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider) {  
    $urlRouterProvider.otherwise('/search');

    authProvider.init({
      clientID: 'p3YX25mAFylU7F6GadLITKleuETnTKiT',
      domain: 'nalp.auth0.com'
    });

    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('id_token');
    };

    $stateProvider
    .state('search', {
      url: '/search',
      templateUrl: 'partials/search.html',
      controller: 'searchCtrl as search_ctrl'
    })
    .state('create', {
      url: '/create',
      templateUrl: 'partials/create.html',
      controller: 'createCtrl as create_ctrl'
    })
    .state('plan', {
      url: '/plan/:plan_id',
      templateUrl: 'partials/plan.html',
      controller: 'planCtrl as plan_ctrl'
    })
    .state('activities', {
      url: '/activities',
      templateUrl: 'partials/activities.html',
      controller: 'activitiesCtrl as activities_ctrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'partials/profile.html',
      controller: 'profileCtrl as profile_ctrl'
    });

    // function redirect($q, $injector, auth, store, $location) {
    //   return {
    //     responseError: function(rejection) {
    //       if(rejection.status === 401) {
    //         auth.signout();
    //         store.remove('profile');
    //         store.remove('id_token')
    //         $location.path('/search');
    //       }

    //       return $q.reject(rejection)
    //     }
    //   }
    // }

    // $provide.factory('redirect', redirect)
    // $httpProvider.interceptors.push('redirect');
    $httpProvider.interceptors.push('jwtInterceptor');

  }

  run.$inject = ['$rootScope', 'auth', 'store', 'jwtHelper', '$location', '$state'];

  function run($rootScope, auth, store, jwtHelper, $location, $state) {
   
    $rootScope.$on('$locationChangeStart', function() {
      var token = store.get('id_token');
      if(token) {
        if(!jwtHelper.isTokenExpired(token)) {
          if(!auth.isAuthenticated) {
            auth.authenticate(store.get('profile'), token);
          }
        }
      }
      else{
        if(!$state.is('plan')) {
          $location.path('/search');
        }
      }
   });
   
  }
})()