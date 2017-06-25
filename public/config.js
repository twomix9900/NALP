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
    $urlRouterProvider.otherwise('/home');

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
      controller: 'searchCtrl as search_ctrl',
      authenticate: false
    })
    .state('create', {
      url: '/create',
      templateUrl: 'partials/create.html',
      controller: 'createCtrl as create_ctrl',
      authenticate: true
    })
    .state('plan', {
      url: '/plan/:plan_id',
      templateUrl: 'partials/plan.html',
      controller: 'planCtrl as plan_ctrl',
      authenticate: false
    })
    .state('activities', {
      url: '/activities',
      templateUrl: 'partials/activities.html',
      controller: 'activitiesCtrl as activities_ctrl',
      authenticate: true
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'partials/profile.html',
      controller: 'profileCtrl as profile_ctrl',
      authenticate: true
    })
    .state('home', {
      url: '/home',
      templateUrl: 'partials/home.html',
      controller: 'homeCtrl as home_ctrl',
      authenticate: false
    })

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
   
    $rootScope.$on('$locationChangeSuccess', function() {
      console.log('state = ', $state)
      if(!$state.current.name === 'plan' || !$state.current.name === 'search' || !$state.current.name === 'home') {
        var token = store.get('id_token');
        if(token) {
          if(!jwtHelper.isTokenExpired(token)) {
            if(!auth.isAuthenticated) {
              auth.authenticate(store.get('profile'), token);
            }
          }
        }
        else{
          $state.go('home');
        }
      } 
   });
   
  }
})()