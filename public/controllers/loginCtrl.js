(function() {
  angular.module('NALP')
  .controller('loginCtrl', loginCtrl)
  function loginCtrl(authService) {
    let vm = this;
    vm.login = () => {
      authService.login();
    }
  }
})()