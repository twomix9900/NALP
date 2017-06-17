(function() {
  angular.module('NALP', ['ui.router'])
  .config(config)

  config.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
  ];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'partials/login.html',
      controller: 'loginCtrl as login_ctrl'
    })
  }
})()