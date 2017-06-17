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
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'partials/login.html',
      controller: 'loginCtrl as login_ctrl'
    })
    .state('callback', {
      url: '/callback',
      templateUrl: 'partials/callback.html',
      controller: 'callbackCtrl as callback_ctrl'
    });

    angularAuth0Provider.init({
      clientID: 'pOJ2UcuFe1fISgSoTwFKENNpoqgu0BEo',
      domain: 'shonozaki.auth0.com',
      responseType: 'token id_token',
      audience: 'https://shonozaki.auth0.com/userinfo',
      redirectUri: 'http://localhost:3002/',
      scope: 'openid'
    });

    $locationProvider.hashPrefix('');

  }
})()