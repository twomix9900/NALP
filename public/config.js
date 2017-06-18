(function() {
  angular.module('NALP', ['auth0.auth0', 'ui.router'])
  .config(config)

  config.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    'angularAuth0Provider'
  ];

  function config($stateProvider, $urlRouterProvider, $locationProvider, angularAuth0Provider) {
    
    $urlRouterProvider.otherwise('/login');

    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      controller: 'loginCtrl as login_ctrl'
    })
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

  }
})()