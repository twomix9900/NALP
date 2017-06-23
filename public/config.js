(function() {
  angular.module('NALP', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
  .config(config)

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
    })

  }
})()