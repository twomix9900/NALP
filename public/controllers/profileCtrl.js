(function() {
  angular.module('NALP')
  .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$http'];

  function profileCtrl($http) {
    var vm = this;
    vm.message = 'Hello';
  }
})()