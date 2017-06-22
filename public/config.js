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
      url: '/plan',
      templateUrl: 'partials/plan.html',
      controller: 'planCtrl as plan_ctrl'
    })
    .state('activities', {
      url: '/activities',
      templateUrl: 'partials/activities.html',
      controller: 'activitiesCtrl as activities_ctrl'
    })
    .state('callback', {
      url: '/callback',
      templateUrl: 'partials/search.html',
      controller: 'callbackCtrl as callback_ctrl'
    });

    angularAuth0Provider.init({
      clientID: 'pOJ2UcuFe1fISgSoTwFKENNpoqgu0BEo',
      domain: 'shonozaki.auth0.com',
      responseType: 'token id_token',
      audience: 'https://shonozaki.auth0.com/userinfo',
      redirectUri: 'http://localhost:3002/#/callback',
      scope: 'openid'
    });

    $locationProvider.hashPrefix('');
    .state('profile', {
      url: '/profile',
      templateUrl: 'partials/profile.html',
      controller: 'profileCtrl as profile_ctrl'
    })

  }
})()